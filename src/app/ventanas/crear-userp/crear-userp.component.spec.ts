import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUserpComponent } from './crear-userp.component';

describe('CrearUserpComponent', () => {
  let component: CrearUserpComponent;
  let fixture: ComponentFixture<CrearUserpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearUserpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearUserpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
