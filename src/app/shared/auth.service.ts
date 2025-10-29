import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  construcor() { }
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  //renvoie une promesse qui, lorsqqu'elle est resolved , renvoie si l'utilisateur est admin
  //ou pas ;pour le moment renvoie true si elle  est loggé

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );
    return isUserAdmin
  }

}
