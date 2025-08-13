import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../authentication/domain/user.service';

export const taskGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const response = await userService.renew()
  return response ? true : router.createUrlTree(['/login']);
};
