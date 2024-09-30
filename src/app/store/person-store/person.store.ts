import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

// TODO: Interface for a person
export interface IPerson {
    name: string;
    age: number;
    skills: string[];
}

// TODO: Initial state is an empty array of persons
const initialState: IPerson[] = [];

// ACTIONS 
// TODO: Action to add a person
export const addPerson = createAction(
    '[PERSON] Add Person',
    props<{ name: string; age: number; skills: string[] }>()
);

// TODO: Action to remove all persons
export const removeAllPersons = createAction('[PERSON] Remove All Persons');
  
// TODO: Reducer to manage person state
export const personReducer = createReducer(
    initialState,
    on(addPerson, (state, { name, age, skills }) => [
        ...state,
        { name, age, skills } // TODO: Add the new person to the state
    ]),
    on(removeAllPersons, () => []) // TODO: Clear the state when all persons are removed
);

// SELECTORS

// TODO: Create a feature selector for persons
const selectPersonFeature = createFeatureSelector<IPerson[]>('persons');

// TODO: Selector to get all persons
export const selectPersons = createSelector(
    selectPersonFeature,
    (state: IPerson[]) => state // TODO: Return the current state of persons
);
