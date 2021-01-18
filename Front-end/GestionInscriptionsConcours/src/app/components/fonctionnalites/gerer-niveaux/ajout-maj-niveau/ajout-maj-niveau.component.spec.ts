import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajNiveauComponent } from './ajout-maj-niveau.component';

describe('AjoutMajNiveauComponent', () => {
  let component: AjoutMajNiveauComponent;
  let fixture: ComponentFixture<AjoutMajNiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajNiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
