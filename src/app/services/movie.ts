import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Movie {
  id: string;
  imdbId: string;
  title: string;
  description: string;
  posterUrl: string;
  duration: number;
  genres: {id:number, name: string}[];

}
@Injectable({
  providedIn: 'root'
})
export class MovieService{
  private backendUrl = 'https://localhost:8081/api/movies';
  private http = inject(HttpClient)
  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.backendUrl);
  }
  getMovieById(id:string):Observable<Movie>{
    return this.http.get<Movie>(`${this.backendUrl}/${id}`);
  }
}
