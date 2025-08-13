import { Routes } from '@angular/router';
import { taskGuard } from './task/presentation/task.guard';
import { loginGuard } from './authentication/presentation/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./authentication/presentation/login/login'),
  },
  {
    path: 'tasks',
    canActivate: [taskGuard],
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
