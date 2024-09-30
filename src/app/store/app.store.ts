import { ActionReducerMap } from "@ngrx/store";
import { IPerson, personReducer } from "./person-store/person.store";
import { ITask, taskReducer } from "./task-store/task.store";

export interface AppState{
    persons:IPerson[]
}

export interface AppStateTask {
    tasks: ITask[]
}

export const appReducersTask: ActionReducerMap<AppStateTask> = {
    tasks:taskReducer
}

export const appReducers: ActionReducerMap<AppState> = {
    persons:personReducer
}