import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajFiliereComponent } from './ajout-maj-filiere.component';

describe('AjoutMajFiliereComponent', () => {
  let component: AjoutMajFiliereComponent;
  let fixture: ComponentFixture<AjoutMajFiliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajFiliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
