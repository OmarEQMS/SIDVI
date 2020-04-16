import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirusComponent } from './virus.component';

describe('VirusComponent', () => {
  let component: VirusComponent;
  let fixture: ComponentFixture<VirusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
