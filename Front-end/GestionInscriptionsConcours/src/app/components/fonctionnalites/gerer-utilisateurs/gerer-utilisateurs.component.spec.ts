import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererUtilisateursComponent } from './gerer-utilisateurs.component';

describe('GererUtilisateursComponent', () => {
  let component: GererUtilisateursComponent;
  let fixture: ComponentFixture<GererUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
