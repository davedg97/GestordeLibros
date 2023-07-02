import { Component, Input, OnChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Genero, Libro } from '../interfaces/libros.interface';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnChanges{

  @Input() listaLibros: Libro[] = [];
  @Input() errorBusqueda: boolean = false;
  listaLibrosAux: Libro[] = [];
  

  listaGeneros: Genero[] = [
    { name: 'Seleccione un género', code: '' },
    { name: 'Ut', code: 'Ut' },
    { name: 'Nam', code: 'Nam' },
    { name: 'Voluptatem', code: 'Voluptatem' },
    { name: 'Unde', code: 'Unde' },
    { name: 'Aperiam', code: 'Aperiam' },
    { name: 'In', code: 'In' }
  ];

  //Acciones sobre los libros
  indAccion: string = '';
  tituloDialog: string = '';
  nombreBoton: string = '';
  libroModificacion: boolean = false;
  camposDisabled: boolean = false;
  submitted: boolean = false;
  libroSeleccionado!:Libro;
  libroNuevo:boolean=false;
  consultaLibro:boolean=false;
  constructor( private librosService: LibrosService, 
               private messageService: MessageService, 
               private confirmationService: ConfirmationService) { }

 
              
            
  detalleLibro(libro: Libro) {
    this.libroSeleccionado = {...libro};
    this.indAccion = 'Detalle';
    this.tituloDialog = 'Detalle del libro';
    this.libroModificacion = false;
    this.camposDisabled = true;
    this.nombreBoton = 'Cerrar';
    this.libroNuevo=false;
    this.consultaLibro=true;
   
  }
 
  ngOnChanges() {
    // Actualiza la lista de libros auxiliar
    this.listaLibrosAux = this.listaLibros;
  }
  
  modificarLibro(libro: Libro) {
    this.libroSeleccionado = {...libro};
    this.indAccion = 'Modificacion';
    this.libroSeleccionado.published = new Date(this.libroSeleccionado.published);
    this.libroModificacion = true;
    this.tituloDialog = 'Modificación del libro';
    this.camposDisabled = false;
    this.nombreBoton = 'Cancelar';
    this.libroNuevo=false;
    this.consultaLibro=false;
 
  }

  cerrarDetalleLibro() {
    this.limpiarLibro();
    this.libroModificacion = false;
    this.libroNuevo=false;
    this.submitted = false;
    this.camposDisabled = false;
    this.consultaLibro=false;
   
  }

  limpiarLibro() {
    if (this.libroSeleccionado) {
      this.libroSeleccionado = {id:          0,
                                title:       "",
                                author:      "",
                                image:       "",
                                genre:       "",
                                isbn:        "",
                                published:   new Date,
                                publisher:   "",
                                description: ""

                              };
    }
  }

 

encontrarIdLibro(id: number): number {
    let index = -1;
    for (let i = 0; i < this.listaLibros.length; i++) {
        if (this.listaLibros[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}

guardarLibro() {
    this.submitted = true;
    if (this.libroSeleccionado){
      if (this.libroSeleccionado.title.trim()) {
          if (this.libroSeleccionado.id) { //Modificación
              this.librosService.actualizarLibro(this.libroSeleccionado).subscribe(  );
              this.listaLibros[this.encontrarIdLibro(this.libroSeleccionado.id)] = this.libroSeleccionado;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Libro modificado', life: 3000});
          }
          this.listaLibros = [...this.listaLibros];
          this.cerrarDetalleLibro();
      }
    }
}
eliminarLibro(libro: Libro) {
    this.confirmationService.confirm({
        message: 'Está seguro de que quiere eliminar el libro "' + libro.title + '"?',
        header: 'Confirmación de eliminación del libro',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.librosService.borrarLibro( libro.id ).subscribe(  );
          this.listaLibros = this.listaLibros.filter(val => val.id !== libro.id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Libro "' + libro.title + '" eliminado', life: 3000});
        }
    });
}  
  
}
