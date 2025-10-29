import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  constructor(private loggingService: LoggingService) { }
  assignments: Assignment[] = [
    { id: 1, nom: "Devoir Angular", dateDeRendu: new Date('2023-01-01'), rendu: true },
    { id: 2, nom: "Rapport Java", dateDeRendu: new Date('2025-02-01'), rendu: false },
    { id: 3, nom: "Rapport Python", dateDeRendu: new Date('2023-03-01'), rendu: false }
  ];
  getAssignment(id: number): Observable<Assignment | undefined> {
    const a = this.assignments.find(a => a.id === id);
    return of(a);
  }
  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, 'ajouté');
    return of('Assignment ajouté avec succcès !');
  }

  updateAssignment(assignment: Assignment): Observable<string> {
    return of('Assignment modifié avec succcès !');
  }
  deleteAssignment(assignment: Assignment): Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);
    return of('Assignment supprimé avec succcès !');
  }


}
