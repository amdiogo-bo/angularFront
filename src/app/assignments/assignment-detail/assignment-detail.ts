import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.css']
})
export class AssignmentDetail implements OnInit {
  // Propriété qui recevra l'assignment du parent
  @Output() deleteAssignment = new EventEmitter<Assignment>();
  // @Input() assignmentTransmis?: Assignment | undefined;
  // @Input() assignmentTransmis?: Assignment;
  // @Output() assignmentRendu = new EventEmitter<Assignment>(); // ✅
  @Output() editAssignment = new EventEmitter<Assignment>();
  assignmentTransmis?: Assignment;
  assignment!: Assignment[];
  rendu!: boolean;

  constructor(private assignmentsService: AssignmentsService, private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = Number(this.route.snapshot.params['id']);
    if (!id) return;
    this.assignmentsService.getAssignment(id)
      .subscribe(a => {
        this.assignmentTransmis = a;
      });
  }


  // ...existing code...
  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu =
        !this.assignmentTransmis.rendu;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message)
          this.router.navigate(['/home']);
        });

      this.assignmentTransmis = undefined;
    }

  }





  onDeleteAssignment() {
    // On va envoyer un événement au composant père pour qu'il supprime
    // l'assignment
    if (!this.assignmentTransmis) return;
    this.deleteAssignment.emit(this.assignmentTransmis);

    this.assignmentsService.deleteAssignment(this.assignmentTransmis!)
      .subscribe(message => console.log(message));
    this.deleteElement();
    this.router.navigate(['/home']);
    // Si on veut que le panneau de détails disparaisse de l'affichage
    // il faut remettre à null ou undefined this.assignmentTransmis
    this.assignmentTransmis = undefined;
  }

  deleteElement(): void {
    this.snackBar.open('Assignment supprimé avec succès !', 'Fermer', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-bar-error']
    });
  }
  onEditAssignment() {
    if (this.assignmentTransmis) {
      this.editAssignment.emit(this.assignmentTransmis);
    }
  }
  
  onClickEdit() {
    if (!this.assignmentTransmis) return;
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
   
  }

  isAdmin():boolean{
    // return this.authService.loggedIn;
    return this.authservice.loggedIn;
    
  }


}
