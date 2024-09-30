import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { StateFormService } from 'src/app/services/state-form.service';
import { addPerson, removeAllPersons, selectPersons } from 'src/app/store/person-store/person.store';
import { selectTasks, updateTask } from 'src/app/store/task-store/task.store';
import { PersonListComponent } from "../person-list/person-list.component";

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    PersonListComponent
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  personForm: FormGroup;
  skillControl = new FormControl('');
  skills: string[] = [];
  loading = false;
  isPersonAdded = false;
  store = inject(Store);
  persons$: Observable<any[]>;
  task$ = this.store.select(selectTasks);

  constructor(private fb: FormBuilder, private serviceForm: StateFormService) {
    this.persons$ = this.store.select(selectPersons); 

    this.personForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator.bind(this)]], 
      age: ['', [Validators.required, Validators.min(1), this.isAdult]],
    });
  }

  // TODO: Validate if the name is a duplicate
  nameValidator(control: FormControl): { [key: string]: any } | null {
    let isDuplicate = false;
    this.persons$.subscribe(persons => {
      isDuplicate = persons.some(person => person.name === control.value);
    });
    return isDuplicate ? { 'duplicateName': true } : null;
  }

  // TODO: Check if the age indicates the person is an adult
  isAdult(control: FormControl) {
    const age = control.value;
    return age >= 18 ? null : { 'isAdult': true }; 
  }

  // TODO: Add a skill to the list
  addSkill() {
    const skill = this.skillControl.value;
    if (skill) {
      this.skills.push(skill);
      this.skillControl.reset();
    }
  }

  // TODO: Remove a skill from the list by index
  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  // TODO: Check if the add person button should be disabled
  isAddPersonDisabled(): boolean {
    return this.personForm.invalid || this.skills.length === 0;
  }

  // TODO: Handle form submission and add a person
  onSubmit() {
    if (this.personForm.valid && this.skills.length > 0) {
      this.loading = true;

      const personData = {
        name: this.personForm.value.name,
        age: this.personForm.value.age,
        skills: this.skills,
      };

      this.store.dispatch(addPerson(personData));
      this.isPersonAdded = true;  
      this.loading = false;
      this.personForm.reset();
      this.skills = [];
    }
  }

  // TODO: Save the task with the current persons
  saveTask() {
    combineLatest([this.persons$, this.task$]).pipe(
      take(1) 
    ).subscribe(([persons, tasks]) => {
      if (tasks && tasks.length > 0) {
        const lastTask = { ...tasks[tasks.length - 1] }; 
        lastTask.persons = persons; 

        console.table(lastTask);

        this.store.dispatch(updateTask({
          name: lastTask.name,
          date: lastTask.date,
          state: lastTask.state,
          persons: lastTask.persons
        }));
      }
      this.serviceForm.setTaskAdded(false);
      this.store.dispatch(removeAllPersons());
      this.resetForm();
    });
  }

  // TODO: Reset the form state and clear skills
  resetForm() {
    this.isPersonAdded = false;
    this.personForm.reset();
    this.skills = [];
  }
}
