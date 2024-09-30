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
  task$ = this.store.select(selectTasks)

  constructor(private fb: FormBuilder , private serviceForm: StateFormService) {

  

    this.persons$ = this.store.select(selectPersons); // Get the list of persons from the store

    

    this.personForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator.bind(this)]], // Add custom validator
      age: ['', [Validators.required, Validators.min(1), this.isAdult]],
    });
  }

 

  // Custom validator to check for duplicate names
  nameValidator(control: FormControl): { [key: string]: any } | null {
    let isDuplicate = false;
    this.persons$.subscribe(persons => {
      isDuplicate = persons.some(person => person.name === control.value);
    });

    return isDuplicate ? { 'duplicateName': true } : null;
  }

  isAdult(control : FormControl){
      const age = control.value
      if (age >= 18){
        return null;
      }
      return { 'isAdult': true }; 
  }

  addSkill() {
    const skill = this.skillControl.value;
    if (skill) {
      this.skills.push(skill);
      this.skillControl.reset();
    }
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  isAddPersonDisabled(): boolean {
    return this.personForm.invalid || this.skills.length === 0;
  }

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
      this.store.dispatch(removeAllPersons())
      this.resetForm();
    });
  }
  

  resetForm() {
    this.isPersonAdded = false;
    this.personForm.reset();
    this.skills = [];
  }
}
