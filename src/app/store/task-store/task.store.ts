import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { IPerson } from "../person-store/person.store";

// Interfaz de la tarea
export interface ITask {
    name: string;
    date: string;
    state: boolean;
    persons: IPerson[];  
}

// TODO: ADD TASK
export const addTask = createAction(
    '[TASK] Add Task',
    props<{ name: string; date: string; state: boolean; persons: IPerson[] }>() // Cambiado "person" a "persons" para que coincida con la interfaz
);

// TODO: UPDATE TASK
export const updateTask = createAction(
    '[TASK] Update Task',
    props<{  name: string; date: string; state: boolean; persons: IPerson[] }>() // Usamos Partial para actualizar campos específicos
);

// TODO: REMOVE TASK
export const removeTask = createAction(
    '[TASK] Remove Task',
    props<{ task: ITask }>()
);

// TODO: INITIAL STATE IS EMPTY
const initialState: ITask[] = [];

// TODO: REDUCER FOR TASK STATE 
export const taskReducer = createReducer(
    initialState,
    on(addTask, (state, { name, date, state: taskState, persons }) => [ // Cambiado "persons: []" a "persons"
        ...state,
        { name, date, state: taskState, persons } // Cambiado "persons: I" a "persons"
    ]), 
    on(updateTask, (state, { name, date, state: taskState, persons }) =>
        state.map(task => 
          task.name === name ? { ...task, name, date, state: taskState, persons } : task
        )
    ),on(removeTask, (state, { task }) => 
        state.filter(existingTask => existingTask !== task) // Elimina la tarea completa
    )
);

// TODO: SELECTOR FOR TASK
const selectTaskFeature = createFeatureSelector<ITask[]>('tasks');

// TODO: SELECTOR FOR GETTING ALL TASKS
export const selectTasks = createSelector(
    selectTaskFeature,
    (state: ITask[]) => state
);
