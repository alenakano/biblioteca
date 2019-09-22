import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicoComponent } from './periodico.component';

describe('PeriodicoComponent', () => {
  let component: PeriodicoComponent;
  let fixture: ComponentFixture<PeriodicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
