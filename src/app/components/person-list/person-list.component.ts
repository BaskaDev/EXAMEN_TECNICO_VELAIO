import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { IPerson, selectPersons } from 'src/app/store/person-store/person.store';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';
// Asegúrate de la ruta correcta

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    SkillsDialogComponent, 
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {
  store = inject(Store);
  dialog = inject(MatDialog);
  persons$ = this.store.select(selectPersons);
  existPersons: boolean = false

  constructor() {
    this.persons$.subscribe(persons => {
      console.log('Personas en el estado:', persons);
      console.log('Es un array:', Array.isArray(persons));
    });
    
  }

  trackPerson(index: number, person: IPerson): string {
    return person.name; 
  }

  openDialog(person: IPerson) {
    this.dialog.open(SkillsDialogComponent, {
      data: { person },
    });
    this.existPersons = true
  }
}
