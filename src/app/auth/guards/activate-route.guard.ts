import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const activateRouteGuard: CanActivateChildFn = (childRoute, state) => {

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isAuth()){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
