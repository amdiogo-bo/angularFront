import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // baseUrl = 'http://localhost:8010/api/assignments';
  baseUrl ='https://backendangular-1.onrender.com/api/assignments';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
    
  ) {}

   assignments: Assignment[] = [];

  // GET: tous les devoirs
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseUrl);
  }

  // GET: un devoir par ID
  getAssignment(id: number): Observable<Assignment> {
    // const a = this.assignments.find(a => a.id === id);
    return this.http.get<Assignment>(this.baseUrl + '/' + id)
    .pipe(
      map(a => {
        a.nom += "Recu et Transforme avec un pipe";
        return a;
      }),
      tap(() =>{
        console.log("tap: assignment avec id= " + id + "requete Get envoyer sur MongoDB cloud");
      }),
      catchError(this.handleError<Assignment>('## catchError: getAssignments by id avec id=' + id + "a échoué"))
    );
  }

  private handleError<T>(operation: any, result?: T) {
   return (error: any): Observable<T> => {
     console.log(error); // pour afficher dans la console
     console.log(operation + ' a échoué ' + error.message);

     return of(result as T);
   }
};


  // POST: ajout d’un devoir
  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.baseUrl, assignment);
  }

  // PUT: mise à jour d’un devoir
  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.baseUrl, assignment);
  }

  // DELETE: suppression d’un devoir
  deleteAssignment(assignment: Assignment): Observable<any> {

    this.loggingService.log(assignment.nom , ' sera supprimé.');

    return this.http.delete<Assignment>(this.baseUrl + '/' + assignment._id);
  }
}
