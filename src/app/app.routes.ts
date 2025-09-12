import {Routes} from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {MovieDetails} from './components/movie-details/movie-details';
import {MovieList} from './components/movie-list/movie-list';
import {Register} from './components/register/register';
import {Reservation} from './components/reservation/reservation';
import {authGuard} from './guards/auth-guard';
import {MyReservations} from './components/my-reservations/my-reservations';


export const routes: Routes = [
  {path: 'login',component: Login},
  {path:'register',component:Register},
  {path:'home',component:Home},
  {path:'movies/:id',component:MovieDetails},
  {path:'movies',component:MovieList},
  {path:'book/:showtimeId',component:Reservation,canActivate: [authGuard]},
  {path: 'my-reservations', component:MyReservations, canActivate: [authGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

