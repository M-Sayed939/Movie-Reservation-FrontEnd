export interface Reservation {
  reservationId: number;
  // id: number;
  movieTitle: string;
  cinemaHallName: string;
  // showtime: string;
  startTime: string;
  reservedSeats: string[];
  status: string;
  userId: number;
}
