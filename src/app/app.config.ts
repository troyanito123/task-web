import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  InjectionToken,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { UserService } from './authentication/domain/user.service';

import { TaskService } from './task/domain/task.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { userTokenInterceptor } from './shared/user-token.interceptor';
import { UserApiService } from './authentication/infraestructure/user-api.service';
import { TaskApiSerivce } from './task/infraestructure/task-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: UserService, useExisting: UserApiService },
    { provide: TaskService, useExisting: TaskApiSerivce },
    provideHttpClient(withInterceptors([userTokenInterceptor])),
  ],
};
