import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // TODO: Provide this service at the root level
})
export class StateFormService {

  // TODO: Create a BehaviorSubject to track the task added state
  private taskAddedSource = new BehaviorSubject<boolean>(false);
  taskAdded$ = this.taskAddedSource.asObservable(); // TODO: Expose the observable for subscribers

  // TODO: Method to update the taskAdded state
  setTaskAdded(value: boolean): void {
    this.taskAddedSource.next(value); // TODO: Emit the new value to all subscribers
  }
}
