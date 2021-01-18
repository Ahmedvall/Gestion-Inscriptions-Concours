import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEnseignantComponent } from './header-enseignant.component';

describe('HeaderEnseignantComponent', () => {
  let component: HeaderEnseignantComponent;
  let fixture: ComponentFixture<HeaderEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
