import { Routes } from '@angular/router';
import { Explorador } from './components/explorador/explorador';

export const routes: Routes = [
  { path: '', redirectTo: 'explorador', pathMatch: 'full' },
  { path: 'explorador', component: Explorador },
  { path: '**', redirectTo: 'explorador' }
];