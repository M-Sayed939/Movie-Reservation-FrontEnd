import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SeatAvailability} from '../dto/seat-availability';
import {CreateReservationRequest} from '../dto/create-reservation-request';
import {Reservation} from '../dto/reservation.dto';
import {Auth} from './auth';

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  private apiUrl = 'http://localhost:8081/api';
  private backendUrl = 'http://localhost:8081/api/reservations';
  private http = inject(HttpClient);
  // private authService = inject(Auth);

  getSeatAvailability(showtimeId: number): Observable<SeatAvailability> {
    return this.http.get<SeatAvailability>(`${this.apiUrl}/showtimes/${showtimeId}/seats`);
  }

  createReservation(reservationRequest: CreateReservationRequest): Observable<Reservation> {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Reservation>(this.backendUrl, reservationRequest);
  }

  getMyReservations(): Observable<Reservation[]> {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Reservation[]>(`${this.backendUrl}/my-reservations`);
  }

}
