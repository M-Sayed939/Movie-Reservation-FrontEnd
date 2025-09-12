import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Movie, MovieService} from '../../services/movie';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  standalone: true
})
export class MovieList {
  private movieService = inject(MovieService);
  movies: Movie[] = [];
  isLoading = true;
  ngOnInit(): void {
    this.isLoading = true;
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.isLoading = false;
      }
    });
  }

}
