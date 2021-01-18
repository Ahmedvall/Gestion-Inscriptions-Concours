import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajEtablissementComponent } from './ajout-maj-etablissement.component';

describe('AjoutMajEtablissementComponent', () => {
  let component: AjoutMajEtablissementComponent;
  let fixture: ComponentFixture<AjoutMajEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
