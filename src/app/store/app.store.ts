import { ActionReducerMap } from "@ngrx/store";
import { IPerson, personReducer } from "./person-store/person.store";
import { ITask, taskReducer } from "./task-store/task.store";

// TODO: Define the main application state interface for persons
export interface AppState {
    persons: IPerson[];
}

// TODO: Define the application state interface for tasks
export interface AppStateTask {
    tasks: ITask[];
}

// TODO: Create the reducer map for tasks
export const appReducersTask: ActionReducerMap<AppStateTask> = {
    tasks: taskReducer // TODO: Assign the taskReducer to the tasks state
};

// TODO: Create the reducer map for persons
export const appReducers: ActionReducerMap<AppState> = {
    persons: personReducer // TODO: Assign the personReducer to the persons state
};
