import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { TarjetaContactoComponent } from '../../components/tarjeta-contacto/tarjeta-contacto.component';
import { NuevoContactoComponent } from '../../components/nuevo-contacto/nuevo-contacto.component';
import { ContactDetailsComponent } from '../../components/contacto-details/contact-details.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { LogoutModule } from '../../components/logout-button/logout-button.module';

@NgModule({
  declarations: [ContactsComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    TarjetaContactoComponent,
    NuevoContactoComponent,
    ContactDetailsComponent,
    FormsModule,
    LogoutModule,
  ],
})
export class ContactsModule {}
