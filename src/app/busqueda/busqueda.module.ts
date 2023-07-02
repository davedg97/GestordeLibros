import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';

import { FiltrosComponent } from './filtros/filtros.component';
import { ListadoComponent } from './listado/listado.component';
import { BusquedaRoutingModule } from './busqueda-routing.module';
import { DetalleLibroComponent } from './detallelibro/detallelibro.component';
import { LibrosService } from './services/libros.service';


@NgModule({
  declarations: [
    FiltrosComponent,
    ListadoComponent,
    DetalleLibroComponent
  ],
  imports: [
    BusquedaRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ImageModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule
  ],
  exports: [
    FiltrosComponent
  ],
  providers: [
    LibrosService,
    ConfirmationService,
    MessageService,
  ]
})
export class BusquedaModule { }
