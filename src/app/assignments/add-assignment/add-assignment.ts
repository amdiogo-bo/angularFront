import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ]
})
export class AddAssignment {
  nomAssignment = '';
  dateDeRendu: Date = new Date();

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Compatible avec (ngSubmit) sans argument obligatoire
  onAjouterAssignment() {
    const nouvelAssignment = new Assignment();
    nouvelAssignment.id = Math.floor(Math.random() * 100000); // Génère un ID aléatoire
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe((message: string) => {
        console.log(message);
        this.ajouterElement(); // snackbar
        this.router.navigate(['/home']); // redirection
      });

    // Réinitialisation du formulaire
    this.nomAssignment = "";
    this.dateDeRendu = new Date();
  }

  ajouterElement(): void {
    this.snackBar.open('Assignment ajouté avec succès !', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
