import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Movie, MovieService} from '../../services/movie';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  standalone: true
})
export class MovieList implements OnInit{
  // private movieService = inject(MovieService);
  // movies: Movie[] = [];
  //   isLoading = true;
  //   ngOnInit(): void {
  //   this.isLoading = true;
  //   this.movieService.getMovies().subscribe({
  //     next: (data) => {
  //       this.movies = data;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching movies:', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }
  movies$! : Observable<Movie[]>;
  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }
}
