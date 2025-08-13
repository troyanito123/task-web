import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  InjectionToken,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { UserFakeService } from './authentication/infraestructure/user-fake.service';
import { UserService } from './authentication/domain/user.service';

import { TaskFakeService } from './task/infraestructure/task-fake.service';
import { TaskService } from './task/domain/task.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: UserService, useExisting: UserFakeService },
    { provide: TaskService, useExisting: TaskFakeService },
  ],
};
