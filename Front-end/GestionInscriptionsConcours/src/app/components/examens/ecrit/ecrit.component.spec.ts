import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcritComponent } from './ecrit.component';

describe('EcritComponent', () => {
  let component: EcritComponent;
  let fixture: ComponentFixture<EcritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
