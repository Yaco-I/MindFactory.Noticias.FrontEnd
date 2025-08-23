import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

  
  // constructor(public dialog: MatDialog) {}

  //   abrirPopup(): void {
  //   const dialogRef = this.dialog.open(PopupContent, {
  //     width: '250px' // Puedes ajustar el ancho del popup
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('El diálogo se cerró');
  //     // Aquí puedes realizar alguna acción después de que se cierre el popup
  //   });
  // }
}
