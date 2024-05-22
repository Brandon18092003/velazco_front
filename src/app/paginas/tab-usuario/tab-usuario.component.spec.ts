import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUsuarioComponent } from './tab-usuario.component';

describe('TabUsuarioComponent', () => {
  let component: TabUsuarioComponent;
  let fixture: ComponentFixture<TabUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
