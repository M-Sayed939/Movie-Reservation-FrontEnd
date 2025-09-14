import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationService} from '../../services/reservation';
import {SeatAvailability} from '../../dto/seat-availability';
import {CreateReservationRequest} from '../../dto/create-reservation-request';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css'
})
export class Reservation implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  showtimeId!: number;
  seatAvailability: SeatAvailability | null = null;
  seatGrid: string[][] = [];
  selectedSeats = new Set<string>();
  errorMessage: string | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.showtimeId = Number(this.route.snapshot.paramMap.get('showtimeId'));
    if (this.showtimeId) {
      this.loadSeatAvailability();
    }
  }

  loadSeatAvailability(): void {
    this.isLoading = true;
    this.reservationService.getSeatAvailability(this.showtimeId).subscribe({
      next: (data) => {
        this.seatAvailability = data;
        this.generateSeatGrid();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching seat availability:', err);
        this.errorMessage = 'Could not load seat map. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  generateSeatGrid(): void {
    if (!this.seatAvailability) return;
    this.seatGrid = [];
    for (let i = 0; i < this.seatAvailability.totalRows; i++) {
      const row: string[] = [];
      const rowChar = String.fromCharCode(65 + i); // A, B, C...
      for (let j = 0; j < this.seatAvailability.totalColumns; j++) {
        row.push(`${rowChar}${j + 1}`);
      }
      this.seatGrid.push(row);
    }
  }

  toggleSeat(seatNumber: string): void {
    if (this.isSeatReserved(seatNumber)) return;
    if (this.selectedSeats.has(seatNumber)) {
      this.selectedSeats.delete(seatNumber);
    } else {
      this.selectedSeats.add(seatNumber);
    }
  }

  isSeatReserved(seatNumber: string): boolean {
    return this.seatAvailability?.reservedSeatNumbers.includes(seatNumber) ?? false;
  }

  isSeatSelected(seatNumber: string): boolean {
    return this.selectedSeats.has(seatNumber);
  }

  bookSeats(): void {
    if (this.selectedSeats.size === 0) {
      this.errorMessage = 'Please select at least one seat.';
      return;
    }
    this.errorMessage = null;

    const reservationRequest: CreateReservationRequest = {
      showtimeId: this.showtimeId,
      seatNumbers: Array.from(this.selectedSeats)
    };

    this.reservationService.createReservation(reservationRequest).subscribe({
      next: (reservation) => {
        alert('Reservation successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating reservation:', err);
        this.errorMessage = err.error.message || 'Booking failed. Please try again.';
      }
    });
  }


  protected readonly Array = Array;
}
