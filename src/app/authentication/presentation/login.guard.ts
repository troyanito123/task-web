import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../domain/user.service';

export const loginGuard: CanActivateFn = async (route, state) => {
 const userService = inject(UserService);
   const router = inject(Router);
   const response = await userService.renew()
   return response ? router.createUrlTree(['/tasks']) : true;
};
