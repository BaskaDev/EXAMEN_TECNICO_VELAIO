import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateFormService } from 'src/app/services/state-form.service';
import { addTask, ITask, selectTasks } from 'src/app/store/task-store/task.store';
import { PersonFormComponent } from "../person-form/person-form.component";
import { TasksListComponent } from "../tasks-list/tasks-list.component";

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PersonFormComponent,
    TasksListComponent
  ],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  tasks$: Observable<ITask[]> = new Observable<ITask[]>(); 
  taskAdded: boolean;
  addedTask: ITask | undefined;
  store = inject(Store);
  tasks = this.store.selectSignal(selectTasks);

  ngOnInit() {
    // TODO: Subscribe to the taskAdded observable from the service
    this.serviceForm.taskAdded$.subscribe(value => {
      this.taskAdded = value;
    });
  }

  constructor(private fb: FormBuilder, private serviceForm: StateFormService) {
    this.taskAdded = false;

    // TODO: Initialize the task form with validators
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, this.lengthValidator]],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  // TODO: Validate that the task name length is greater than 5
  lengthValidator(control: FormControl) {
    const value = control.value;
  
    if (value && value.length > 5) {
      return null; 
    }
    
    return { 'lengthInvalid': true }; 
  }

  // TODO: Validate that the selected date is in the future
  futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null; 
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return selectedDate < today ? { pastDate: true } : null; 
  }

  // TODO: Track tasks by their name
  trackByTaskName(index: number, task: ITask): string {
    return task.name; // Ensure 'name' is unique for each task
  }
  
  // TODO: Handle form submission
  onSubmit(): void {
    if (this.taskForm.valid) {
      this.addTask(this.taskForm.value);
      console.log('Form submitted:', this.taskForm.value);
    } else {
      console.log('The form is invalid');
    }
  }

  // TODO: Add a task to the store
  addTask(formValue: { taskName: string; dueDate: string }): void {
    const task: ITask = {
      name: formValue.taskName,
      date: formValue.dueDate,
      state: false,
      persons: [], 
    };

    this.store.dispatch(addTask(task)); 
    this.addedTask = task;
    this.setValue();
    this.resetForm();
  }

  // TODO: Set the taskAdded flag and notify the service
  setValue(): void {
    this.taskAdded = true;
    this.serviceForm.setTaskAdded(true);
  }

  // TODO: Reset the task form
  resetForm() {
    this.taskForm.reset();
  }
}
