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
import { ITask, selectTasks, updateTask } from 'src/app/store/task-store/task.store';
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
  store = inject(Store);
  dialog = inject(MatDialog);
  tasks$: Observable<ITask[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor() {
    this.tasks$ = this.store.select(selectTasks);
    
  }

  // Método para filtrar las tareas
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

  // Método para establecer el filtro
  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
  }

  // Método para cambiar el estado de la tarea
  toggleTaskState(task: ITask): void {
    this.store.dispatch(updateTask({ ...task, state: !task.state }));
  }

  trackTask(index: number, task: ITask): string {
    return task.name;
  }
}
