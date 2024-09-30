import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-skills-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './skills-dialog.component.html', // Cambia a templateUrl
})
export class SkillsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { person: any },
    private dialogRef: MatDialogRef<SkillsDialogComponent> // Inyecta MatDialogRef
  ) {}

  close() {
    this.dialogRef.close(); // Cierra el diálogo
  }
}
