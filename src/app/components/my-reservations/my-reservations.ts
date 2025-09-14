import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservationService} from '../../services/reservation';
import {Observable} from 'rxjs';
import {Reservation} from '../../dto/reservation.dto';

@Component({
  selector: 'app-my-reservations',
  imports: [CommonModule],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
  standalone: true
})
export class MyReservations implements OnInit{
  private reservationService = inject(ReservationService);
  reservations$!: Observable<Reservation[]>;
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.reservations$ = this.reservationService.getMyReservations();
    this.reservations$.subscribe({
      next: () => this.isLoading = false,
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.isLoading = false
      }
    });
  }

}
