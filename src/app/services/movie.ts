import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Movie {
  id: string;
  // imdbId: string;
  title: string;
  description: string;
  posterUrl: string;
  duration: number;
  genres: string[];

}
export interface Showtime {
  id: number;
  movieTitle: string;
  CinemaName: string;
  startTime: string;
  endTime: string;
  price: string;
}
@Injectable({
  providedIn: 'root'
})
export class MovieService{
  private backendUrl = 'http://localhost:8081/api/movies';
  // private http = inject(HttpClient)
  constructor(private http: HttpClient) { }
  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`http://localhost:8081/api/movies`);
  }
  getMovieById(id:string):Observable<Movie>{
    return this.http.get<Movie>(`http://localhost:8081/api/movies/${id}`);
  }
  getShowtimesForMovie(movieId:string, date:string):Observable<Showtime[]>{
    return this.http.get<Showtime[]>(`http://localhost:8081/api/movies/${movieId}/showtimes?date=${date}`);
  }
}
