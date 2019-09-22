import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrasObrasComponent } from './outras-obras.component';

describe('OutrasObrasComponent', () => {
  let component: OutrasObrasComponent;
  let fixture: ComponentFixture<OutrasObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutrasObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutrasObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
