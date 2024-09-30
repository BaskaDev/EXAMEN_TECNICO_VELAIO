import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

// INTERFACE PERSOM
export interface IPerson {
    name: string;
    age: number;
    skills: string[] ;
}

const initialState: IPerson[] = [];

//ACTIONS 
// Acción de agregar persona
export const addPerson = createAction(
    '[PERSON] Add Person',
    props<{ name: string; age: number; skills: string[] }>()
  );

  //LIMPIAR LA LISTA DEL FORM
  export const removeAllPersons = createAction('[PERSON] Remove All Persons');
  
  // Reductor
  export const personReducer = createReducer(
    initialState,
    on(addPerson, (state, { name, age, skills }) => [
      ...state,
      { name, age, skills }
    ]),
    on(removeAllPersons, () => [])
  );
  
// INITIAL STATE




// SELECTOR FOR PERSONS
const selectPersonFeature = createFeatureSelector<IPerson[]>('persons');

//SELECTOR FOR ALL PERSONS
export const selectPersons = createSelector(
    selectPersonFeature,
    (state: IPerson[]) => state
);
