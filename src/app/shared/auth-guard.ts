import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { CanActivate } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  //injection par programmme (au lieu de le faire dans le constructeur d'un composant)
  let authService = inject(AuthService)
  let router = inject(Router);
  //si ca renvoie true alors on peut activer la route
  return authService.isAdmin()
    .then(authentifie => {
      if (authentifie) {
        console.log(" ✅vous etes admin,navigation autorisé!");
        return true;
      } else {
        console.log("❌ vous n'etes pas admin! Navigation refusée!");
        //et on retourne vers la page d'accueil
        router.navigate(["/home"]);
        return false;
      }
    })
};
