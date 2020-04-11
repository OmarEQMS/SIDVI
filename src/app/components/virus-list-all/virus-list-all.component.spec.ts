import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirusListAllComponent } from './virus-list-all.component';

describe('VirusListAllComponent', () => {
  let component: VirusListAllComponent;
  let fixture: ComponentFixture<VirusListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirusListAllComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirusListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
