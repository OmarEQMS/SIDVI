import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiConsultorioDetallesComponent } from './mi-consultorio-detalles.component';

describe('MiConsultorioDetallesComponent', () => {
  let component: MiConsultorioDetallesComponent;
  let fixture: ComponentFixture<MiConsultorioDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiConsultorioDetallesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiConsultorioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
