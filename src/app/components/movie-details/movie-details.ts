import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Movie, MovieService} from '../../services/movie';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  standalone: true
})
export class MovieDetails {
  movieData: Movie | null = null;
  constructor(private route: ActivatedRoute, private movieService: MovieService){
  }

  // movie = signal<Movie | null>(null);
  ngOnInit(){
    const movieId = this.route.snapshot.paramMap.get('id');
    if(movieId){
      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          this.movieData = data;
        }, error: (err) => {
          console.error('Error fetching movie details:', err);
        }
      });
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

}
