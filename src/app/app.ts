import { Component, OnInit} from '@angular/core';
import { RouterOutlet,RouterModule, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
// import { Assignments } from "./assignments/assignments";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatSidenavModule } from '@angular/material/sidenav'; // si tu en utilises un
import { MatListModule } from '@angular/material/list'; // si tu as une liste Materia
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';



@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSidenavModule, MatListModule,
    
    FormsModule, // 👈 Obligatoire pour [(ngModel)]
    MatCheckboxModule, RouterModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  // protected readonly title = signal('assignment-app');
   title = " Application de gestion des assignments à rendre";

  //   nomDuProf = 'Michel Buffa';
  //   prof:string = 'Buffa Michel';
  //   ngOnInit(): void {
  //   console.log('Juste après le constructeur');
  //   setTimeout(() => {
  //     this.nomDuProf = 'Buffa Michel MODIFIEE';
  //   }, 3000);
  // }
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  nomDuProf = "Michel Buffa";
  opened = true;

  toggleOpen() {
    this.opened = !this.opened;
  }

  login() {
    if (!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.router.navigate(['/home']);
    }
  }



}
