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
  existPersons: boolean = false;

  constructor() {
    // TODO: Subscribe to the persons observable to log the current persons in the state
    this.persons$.subscribe(persons => {
      console.log('Persons in the state:', persons);
      console.log('Is it an array:', Array.isArray(persons));
    });
  }

  // TODO: Track a person by index and return their name
  trackPerson(index: number, person: IPerson): string {
    return person.name; 
  }

  // TODO: Open the skills dialog for a selected person
  openDialog(person: IPerson) {
    this.dialog.open(SkillsDialogComponent, {
      data: { person },
    });
    this.existPersons = true;
  }
}
