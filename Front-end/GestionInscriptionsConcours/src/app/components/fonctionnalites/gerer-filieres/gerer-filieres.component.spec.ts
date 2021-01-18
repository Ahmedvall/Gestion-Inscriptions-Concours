import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererFilieresComponent } from './gerer-filieres.component';

describe('GererFilieresComponent', () => {
  let component: GererFilieresComponent;
  let fixture: ComponentFixture<GererFilieresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererFilieresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererFilieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
