import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererMatieresComponent } from './gerer-matieres.component';

describe('GererMatieresComponent', () => {
  let component: GererMatieresComponent;
  let fixture: ComponentFixture<GererMatieresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererMatieresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
