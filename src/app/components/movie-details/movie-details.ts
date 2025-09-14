import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Movie, MovieService, Showtime} from '../../services/movie';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink],
  // providers:[DatePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  standalone: true
})
export class MovieDetails implements OnInit{
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  // private datePipe = inject(DatePipe);
  // movieData: Movie | null = null;
  movieData$: Observable<Movie> | undefined;
  showtimes$: Observable<Showtime[]> | undefined;
  selectedDate:string = new Date().toISOString().split('T')[0];
  // constructor(){
  //   this.selectedDate
  //     = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  // }

  // movie = signal<Movie | null>(null);
  ngOnInit(){
    const movieId = this.route.snapshot.paramMap.get('id');
    if(movieId){
      this.movieData$ = this.movieService.getMovieById(movieId);
      this.loadShowtimes(movieId);
      // this.movieService.getMovieById(movieId).subscribe({
      //   next: (data) => {
      //     this.movieData = data;
      //   }, error: (err) => {
      //     console.error('Error fetching movie details:', err);
      //   }
      // });
    }
  //   this.route.paramMap.pipe(
  //     switchMap(params => {
  //       const movieId = params.get('id');
  //       if (movieId) {
  //         return this.movieService.getMovieById(movieId);
  //       }
  //       return [];
  //     }
  //   )).subscribe(movie =>{
  //     this.movie.set(movie);
  //   });
  }
  onDateChange(event: Event):void{
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    const movieId = this.route.snapshot.paramMap.get('id');
    if(movieId){
      this.loadShowtimes(movieId);
    }
  }
  private loadShowtimes(movieId: string): void {
    this.showtimes$ = this.movieService.getShowtimesForMovie(movieId, this.selectedDate);
  }

}
