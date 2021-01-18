import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererSpecialitesComponent } from './gerer-specialites.component';

describe('GererSpecialitesComponent', () => {
  let component: GererSpecialitesComponent;
  let fixture: ComponentFixture<GererSpecialitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererSpecialitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererSpecialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
