import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor() { };
  log(message: string, action: string) {
    console.log(`LoggingService: ${message} - ${action}`);
  } 
}
