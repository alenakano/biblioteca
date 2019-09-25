import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestarComponent } from './emprestar.component';

describe('EmprestarComponent', () => {
  let component: EmprestarComponent;
  let fixture: ComponentFixture<EmprestarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
