import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMajVilleComponent } from './ajout-maj-ville.component';

describe('AjoutMajVilleComponent', () => {
  let component: AjoutMajVilleComponent;
  let fixture: ComponentFixture<AjoutMajVilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMajVilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMajVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
