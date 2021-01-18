import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajMatiereComponent } from './ajout-maj-matiere.component';

describe('AjoutMajMatiereComponent', () => {
  let component: AjoutMajMatiereComponent;
  let fixture: ComponentFixture<AjoutMajMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
