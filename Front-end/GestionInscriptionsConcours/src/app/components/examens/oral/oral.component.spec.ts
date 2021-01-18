import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OralComponent } from './oral.component';

describe('OralComponent', () => {
  let component: OralComponent;
  let fixture: ComponentFixture<OralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
