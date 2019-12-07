import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComumLibComponent } from './comumLib.component';

describe('ComumLibComponent', () => {
  let component: ComumLibComponent;
  let fixture: ComponentFixture<ComumLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComumLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComumLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
