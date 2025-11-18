import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loggedIn = false;
  private currentUser: { username: string; role: string } | null = null;
  // Tableau des utilisateurs
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];
  constructor() { }
  logIn(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      console.log(`✅ Connecté : ${user.username} (${user.role})`);
      return true;
    }
    console.warn('❌ Identifiants incorrects');
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.currentUser = null;
    console.log('🚪 Déconnexion réussie');
  }

  isLogged(): boolean {
    return this.loggedIn;
  }
  // isLogged(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     resolve(this.loggedIn);
  //   });
  // }
  // isAdmin(): boolean {
  //   return this.loggedIn && this.currentUser?.role === 'admin';
  // }
  isAdmin(): Promise<boolean> {
    return new Promise((resolve) => {
      const isAdmin = this.loggedIn && this.currentUser?.role === 'admin';
      resolve(isAdmin);
    });
  }

  getCurrentUser(): string | null {
    return this.currentUser?.username || null;
  }

  getCurrentRole(): string | null {
    return this.currentUser?.role || null;
  }

  //renvoie une promesse qui, lorsqqu'elle est resolved , renvoie si l'utilisateur est admin
  //ou pas ;pour le moment renvoie true si elle  est loggé

  // isAdmin() {
  //   const isUserAdmin = new Promise(
  //     (resolve, reject) => {
  //       resolve(this.loggedIn);
  //     }
  //   );
  //   return isUserAdmin
  // }

}

