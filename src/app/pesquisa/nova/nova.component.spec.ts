import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaComponent } from './nova.component';

describe('NovaComponent', () => {
  let component: NovaComponent;
  let fixture: ComponentFixture<NovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
