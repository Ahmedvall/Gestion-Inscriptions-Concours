import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajSpecialiteComponent } from './ajout-maj-specialite.component';

describe('AjoutMajSpecialiteComponent', () => {
  let component: AjoutMajSpecialiteComponent;
  let fixture: ComponentFixture<AjoutMajSpecialiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajSpecialiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
