import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'; // Para usar chips (si decides volver a incluirlos)
import { MatDialogModule } from '@angular/material/dialog'; // Importar MatDialogModule
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; // Para usar iconos
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'; // Para la lista de personas
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav'; // Para el menú tipo hamburguesa
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { appReducers, appReducersTask } from './store/app.store';
import { personReducer } from './store/person-store/person.store';
import { taskReducer } from './store/task-store/task.store';



@NgModule({
  declarations: [
    AppComponent
    
   
  ],
  imports: [
    PersonFormComponent,
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule, // Si decides mantener chips
    MatIconModule,
    MatSidenavModule, // Añadido para el menú lateral
    MatListModule, // Añadido para listas
    MatDialogModule, // Asegúrate de importar MatDialogModule
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forFeature('persons', personReducer),
    StoreModule.forRoot({persons:personReducer}),
    StoreModule.forRoot({ tasks: taskReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [provideStore(appReducers), provideStore(appReducersTask)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
