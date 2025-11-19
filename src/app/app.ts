import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
// import { Assignments } from "./assignments/assignments";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; // si tu en utilises un
import { MatListModule } from '@angular/material/list'; // si tu as une liste Materia
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSidenavModule, MatListModule,

    FormsModule, // 👈 Obligatoire pour [(ngModel)]
    MatCheckboxModule, RouterModule, RouterLink,
  CommonModule,
  HttpClientModule,
  BrowserAnimationsModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // protected readonly title = signal('assignment-app');
  title = " Application de gestion des assignments à rendre";
  username: string = '';
  password: string = '';

  //   nomDuProf = 'Michel Buffa';
  //   prof:string = 'Buffa Michel';
  //   ngOnInit(): void {
  //   console.log('Juste après le constructeur');
  //   setTimeout(() => {
  //     this.nomDuProf = 'Buffa Michel MODIFIEE';
  //   }, 3000);
  // }
  constructor(public authService: AuthService, private router: Router) { 
   
  }
  ngOnInit() {
    console.log('Connecté ?', this.authService.isLogged());
  }

  nomDuProf = "Michel Buffa";
  opened = true;

  toggleOpen() {
    this.opened = !this.opened;
  }

  // login() {
  //   if (!this.authService.loggedIn) {
  //     this.authService.logIn();
  //   } else {
  //     this.router.navigate(['/home']);
  //   }
  // }

  // Redirige vers le formulaire de connexion
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Déconnexion + redirection
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  // Optionnel : méthode pratique pour le template

 




}
