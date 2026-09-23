import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessaoService } from '../services/sessao.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessao = inject(SessaoService);
  const router = inject(Router);
  if(!sessao.user){
    router.navigate(['/login']);
  }
  return !!sessao.user;
};
