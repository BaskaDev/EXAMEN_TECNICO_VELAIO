import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateFormService {

  private taskAddedSource = new BehaviorSubject<boolean>(false);
  taskAdded$ = this.taskAddedSource.asObservable();

  setTaskAdded(value: boolean): void {
    this.taskAddedSource.next(value);
  }


  
}
