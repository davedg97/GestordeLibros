import { Component, Input, OnInit } from '@angular/core';
import { Busqueda, Genero, Libro } from '../interfaces/libros.interface';
import { LibrosService } from '../services/libros.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent {

  constructor(private librosService: LibrosService,private messageService: MessageService, private router: Router) {}

  filtro: Busqueda = {
    titulo: '',
    genero: {
      name: 'Seleccione un género',
      code: '',
    },
    fechaPublicacionInicio: [],
    fechaPublicacionFin: [],
  };
 
  listaGeneros: Genero[] = [
    { name: 'Seleccione un género', code: '' },
    { name: 'Ut', code: 'Ut' },
    { name: 'Nam', code: 'Nam' },
    { name: 'Voluptatem', code: 'Voluptatem' },
    { name: 'Unde', code: 'Unde' },
    { name: 'Aperiam', code: 'Aperiam' },
    { name: 'In', code: 'In' },
  ];
  verMasFiltros = false;
  botonDisabled = true;
  displayDialogNewLibro:boolean=false;
  libroNuevo:boolean=false;
  listaLibros: Libro[] = [];
  errorBusqueda = false;
  indAccion: string = '';
  tituloDialog: string = '';
  nombreBoton: string = '';
  libroModificacion: boolean = false;
  camposDisabled: boolean = false;
  submitted: boolean = false;
  libroSeleccionado!:Libro;
  botonActivado :boolean=false;
  consultaLibro:boolean=false;
  mostrarLista:boolean = false;


  crearLibro() {
    this.libroSeleccionado = {
      id: 0,
      title: "",
      author: "",
      image: "",
      genre: "",
      isbn: "",
      published: new Date(),
      publisher: "",
      description: ""
    };
    this.libroModificacion = false;
    this.indAccion = 'Nuevo';
    this.tituloDialog = 'Nuevo libro';
    this.camposDisabled = false;
    this.nombreBoton = 'Cancelar';
    this.libroNuevo=true;
    this.botonActivado=true;
    this.consultaLibro=false;
    this.mostrarLista = false;
  }
  crearLibros() {
    
    this.librosService.crearLibro(this.libroSeleccionado).subscribe(
      (nuevoLibro: Libro) => {
        this.libroSeleccionado = nuevoLibro;
        console.log('Crear libro');
        console.log('nuevoLibro', nuevoLibro);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Libro añadido', life: 3000});
        this.listaLibros.push(nuevoLibro);
        this.listaLibros = [...this.listaLibros];
        this.cerrarLibro();
      }
      
    );
  }
  cerrarLibro() {
    this.submitted = false;
    this.camposDisabled = false;
  }


  masFiltros() {
    this.verMasFiltros = !this.verMasFiltros;
  }

  ocultarFiltros(){
    this.verMasFiltros=false;
  }
  ocultarNuevoLibro(){
    this.libroNuevo=false;
  }
  controlBotonLimpiar() {
    this.botonDisabled = !(
      this.filtro.titulo.trim() !== '' ||
      this.filtro.genero.code.trim() !== '' ||
      this.filtro.fechaPublicacionInicio.length!=0||
      this.filtro.fechaPublicacionFin.length!=0
    );
  }
 
 
  borrarFiltros() {
    this.filtro = {
      titulo: '',
      genero: {
        name: 'Seleccione un género',
        code: ''
      },
      fechaPublicacionInicio: [],
      fechaPublicacionFin:[]
    };
    this.verMasFiltros = false;
    this.controlBotonLimpiar();
  }

  limpiarlibroSeleccionado() {
    if (this.libroSeleccionado) {
      this.libroSeleccionado = {id:          0,
                                title:       "",
                                author:      "",
                                image:       "http://placeimg.com/480/640/any",
                                genre:       "",
                                isbn:        "",
                                published:   new Date,
                                publisher:   "",
                                description: ""
                              };
    }
  }


  buscar() {
    this.controlBotonLimpiar();
    if (!this.verMasFiltros) {
      this.librosService
        .getLibrosPorTitulo(this.filtro.titulo.trim())
        .subscribe(
          libros => {
            this.listaLibros = libros;
            
          },
          err => {
            this.errorBusqueda = true;
            this.listaLibros = [];
          }
        );
    } else {
      this.librosService
        .getLibrosPorTituloYMasFiltros(
          this.filtro.titulo.trim(),
          this.filtro.genero.code,
          this.filtro.fechaPublicacionInicio,
          this.filtro.fechaPublicacionFin
        )
        .subscribe(
          libros => {
            this.listaLibros = libros;
            if (this.listaLibros.length === 0) {
              this.errorBusqueda = true;
              this.mostrarLista = true;
            } else {
              
                this.filtrarPorFechas(this.filtro.fechaPublicacionInicio[0], this.filtro.fechaPublicacionFin[0]);
              
              this.errorBusqueda = this.listaLibros.length === 0;
            }
          },
          err => {
            this.errorBusqueda = true;
            this.mostrarLista = false;
            this.listaLibros = [];
          }
        );
    }
  }
  filtrarPorFechas(fechaInicio: Date, fechaFin: Date) {
  if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
    // Si la fecha de inicio es mayor a la de fin, intercambiamos los valores
    const temp = fechaInicio;
    fechaInicio = fechaFin;
    fechaFin = temp;
  }

  // Creamos un nuevo array con los libros filtrados por fecha
  const librosFiltrados = this.listaLibros.filter(libro => {
    const fechaPublicacion = new Date(libro.published);
    return (!fechaInicio || fechaPublicacion >= fechaInicio) && (!fechaFin || fechaPublicacion <= fechaFin);
  });

  // Actualizamos la lista de libros con los resultados de la búsqueda
  this.listaLibros = librosFiltrados;
}
}