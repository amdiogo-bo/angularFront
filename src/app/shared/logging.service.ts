import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Inject } from '@angular/core';
import { CanActivate,Route} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor() { };
  log(message: string, action: string) {
    console.log(`LoggingService: ${message} - ${action}`);
  } 
}
