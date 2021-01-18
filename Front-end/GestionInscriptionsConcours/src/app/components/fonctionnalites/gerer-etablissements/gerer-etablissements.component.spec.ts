import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererEtablissementsComponent } from './gerer-etablissements.component';

describe('GererEtablissementsComponent', () => {
  let component: GererEtablissementsComponent;
  let fixture: ComponentFixture<GererEtablissementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererEtablissementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererEtablissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
