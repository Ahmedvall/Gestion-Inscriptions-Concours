import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajCritereComponent } from './ajout-maj-critere.component';

describe('AjoutMajCritereComponent', () => {
  let component: AjoutMajCritereComponent;
  let fixture: ComponentFixture<AjoutMajCritereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajCritereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
