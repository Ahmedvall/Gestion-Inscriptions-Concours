import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererNiveauxComponent } from './gerer-niveaux.component';

describe('GererNiveauxComponent', () => {
  let component: GererNiveauxComponent;
  let fixture: ComponentFixture<GererNiveauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererNiveauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererNiveauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
