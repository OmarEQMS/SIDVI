import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcercaDeComponent } from './acerca-de.component';

describe('AcercaDeComponent', () => {
  let component: AcercaDeComponent;
  let fixture: ComponentFixture<AcercaDeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercaDeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcercaDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
