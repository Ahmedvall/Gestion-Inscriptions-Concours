import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererVillesComponent } from './gerer-villes.component';

describe('GererVillesComponent', () => {
  let component: GererVillesComponent;
  let fixture: ComponentFixture<GererVillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererVillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
