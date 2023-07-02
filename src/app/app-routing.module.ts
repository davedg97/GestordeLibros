import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'buscar',
    loadChildren: () => import('./busqueda/busqueda.module').then( m => m.BusquedaModule )
  },
  {
    path: '404',
    redirectTo: 'busqueda'
  },
  {
    path: '**',
    redirectTo: 'busqueda'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
