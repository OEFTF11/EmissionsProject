import { Routes } from '@angular/router';
import { EmissionsList } from './emissions-list/emissions-list';

export const routes: Routes = [
  {
    path: 'emissions',
    component: EmissionsList
  },
  {
    path: '',
    redirectTo: 'emissions',
    pathMatch: 'full'
  }
];
