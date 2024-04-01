import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { TarjetaContactoComponent } from '../../components/tarjeta-contacto/tarjeta-contacto.component';
import { NuevoContactoComponent } from '../../components/nuevo-contacto/nuevo-contacto.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    TarjetaContactoComponent,
    NuevoContactoComponent,
  ],
})
export class ContactsModule {}
