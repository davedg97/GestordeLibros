import { Component, Input } from '@angular/core';
import { Genero, Libro } from '../interfaces/libros.interface';

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html'
})
export class DetalleLibroComponent {

   @Input() libroSeleccionado!: Libro;  
   @Input() indAccion: string = '';
   @Input() submitted: boolean = false;
   @Input() camposDisabled: boolean = false;

   listaGeneros:Genero[]=[{name: 'Seleccione un género', code: ''}, 
                          {name: 'Ut',         code: 'Ut'}, 
                          {name: 'Nam',        code: 'Nam'}, 
                          {name: 'Voluptatem', code: 'Voluptatem'}, 
                          {name: 'Unde',       code: 'Unde'}, 
                          {name: 'Aperiam',    code: 'Aperiam'}, 
                          {name: 'In',         code: 'In'}]; 
 

  constructor() { }

}
