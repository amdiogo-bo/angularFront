import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Assignment } from './assignment.model';
import { Rendu } from '../shared/rendu';
import { NonRendu } from '../shared/nonRendu';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-assignments',
  standalone: true,
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.css'],
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatListModule, Rendu, NonRendu,
    RouterModule, MatIconModule, MatCardModule
  ]
})
export class Assignments {

  formVisible = false;
  assignmentSelectionne: Assignment | undefined = undefined;
  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService ,public authService: AuthService) { }
  ngOnInit(): void {
    //this.getAssignmenthis.assignments = this.assignmentsService.getAssignments();
    this.getAssignments();

  }
  getAssignments() {
    //this.assignments = this.assignmentService.getAssignments();
    this.assignmentsService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }
  /*onAddAssignmentBtnClick() {
    this.formVisible = true;
  }
  onNouvelAssignment(event: Assignment) {
    // Ajout via le service, puis rafraîchir la liste et fermer le formulaire
    this.assignmentsService.addAssignment(event)
      .subscribe({
        next: message => {
          console.log(message);
          this.getAssignments();
          this.formVisible = false;
        },
        error: err => console.error('Erreur ajout:', err)
      });
  }

  
  onAssignmentAdded(updatedAssignment: Assignment) {
    // Si c'était une modification, on remplace l'ancien
    const index = this.assignments.findIndex(a => a.id === updatedAssignment.id);
    if (index !== -1) {
      this.assignments[index] = updatedAssignment;
    } else {
      this.assignments.push(updatedAssignment);
    }
    this.formVisible = false;
  }
*/
  // Événement reçu quand on clique sur Annuler
  onCancelForm() {
    this.formVisible = false;
  }


  onAssignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    console.log("Tu as cliqué sur :", assignment);
  }
  // ✅ ici on supprime l'assignment reçu de l'enfant
  onDeleteAssignment(assignment: Assignment) {
    this.assignments = this.assignments.filter(a => a !== assignment);
    this.assignmentSelectionne = undefined; // on cache le détail
  }

  onEditAssignment(assignment: Assignment) {
    // On rend le formulaire visible et on pré-remplit les champs
    this.assignmentSelectionne = assignment;
    this.formVisible = true; // 👉 afficher le formulaire d'édition
  }

  onAssignmentRendu(assignment: Assignment) {
    // On met à jour la valeur dans la liste principale
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index !== -1) {
      this.assignments[index].rendu = true;
    }

    // On met aussi à jour le détail affiché
    this.assignmentSelectionne = { ...assignment, rendu: true };
  }

   get nombreRendu(): number {
    return this.assignments.filter(a => a.rendu).length;
  }


}
