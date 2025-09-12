import {Routes} from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {MovieList} from './components/movie-list/movie-list';
import {Register} from './components/register/register';


export const routes: Routes = [
  {path: 'login',component: Login},
  {path:'register',component:Register},
  {path:'home',component:Home},
  {path:'movies',component:MovieList},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

