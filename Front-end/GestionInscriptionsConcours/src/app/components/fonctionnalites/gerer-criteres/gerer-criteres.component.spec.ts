import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererCriteresComponent } from './gerer-criteres.component';

describe('GererCriteresComponent', () => {
  let component: GererCriteresComponent;
  let fixture: ComponentFixture<GererCriteresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererCriteresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererCriteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
