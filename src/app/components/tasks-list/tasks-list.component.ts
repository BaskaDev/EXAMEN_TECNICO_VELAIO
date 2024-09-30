import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask, removeTask, selectTasks, updateTask } from 'src/app/store/task-store/task.store';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    SkillsDialogComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  // TODO: Inject the Store to manage data
  store = inject(Store);
  dialog = inject(MatDialog);
  tasks$: Observable<ITask[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor() {
    // TODO: Select tasks from the store
    this.tasks$ = this.store.select(selectTasks);
  }

  // TODO: Filter tasks based on their state
  get filteredTasks$(): Observable<ITask[]> {
    return this.tasks$.pipe(map(tasks => {
      switch (this.filter) {
        case 'completed':
          return tasks.filter(task => task.state);
        case 'pending':
          return tasks.filter(task => !task.state);
        default:
          return tasks;
      }
    }));
  }

  // TODO: Set the filter criteria for displaying tasks
  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
  }

  // TODO: Toggle the state of a task (completed/pending)
  toggleTaskState(task: ITask): void {
    this.store.dispatch(updateTask({ ...task, state: !task.state }));
  }

  // TODO: Remove a person from a task and handle task removal if no persons remain
  removePerson(task: ITask, index: number): void {
    const updatedPersons = task.persons.filter((_, i) => i !== index);
    
    if (updatedPersons.length === 0) {
      // TODO: Dispatch removeTask action if there are no persons left
      this.store.dispatch(removeTask({ task }));
    } else {
      // TODO: Dispatch updateTask action if persons remain
      const updatedTask = { ...task, persons: updatedPersons };
      this.store.dispatch(updateTask(updatedTask));
    }
  }

  // TODO: Track tasks by their name for better performance in lists
  trackTask(index: number, task: ITask): string {
    return task.name;
  }
}
