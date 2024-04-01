import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../interfaces/contacto';

@Component({
  selector: 'app-tarjeta-contacto',
  standalone: true,
  templateUrl: './tarjeta-contacto.component.html',
  styleUrls: ['./tarjeta-contacto.component.scss'],
  imports: [CommonModule],
})
export class TarjetaContactoComponent {
  @Input({ required: true }) contacto!: Contacto;
}
