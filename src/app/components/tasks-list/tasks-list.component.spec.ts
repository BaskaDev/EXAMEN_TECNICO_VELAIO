import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksListComponent]
    });
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
