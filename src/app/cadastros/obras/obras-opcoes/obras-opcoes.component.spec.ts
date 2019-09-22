import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasOpcoesComponent } from './obras-opcoes.component';

describe('ObrasOpcoesComponent', () => {
  let component: ObrasOpcoesComponent;
  let fixture: ComponentFixture<ObrasOpcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasOpcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
