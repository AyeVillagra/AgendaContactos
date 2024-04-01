import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaContactoComponent } from './tarjeta-contacto.component';

describe('TarjetaContactoComponent', () => {
  let component: TarjetaContactoComponent;
  let fixture: ComponentFixture<TarjetaContactoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaContactoComponent],
    });
    fixture = TestBed.createComponent(TarjetaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
