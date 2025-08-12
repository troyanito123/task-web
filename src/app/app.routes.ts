import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./authentication/presentation/login/login'),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./task/presentation/task-list/task-list'),
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found'),
  },
];
