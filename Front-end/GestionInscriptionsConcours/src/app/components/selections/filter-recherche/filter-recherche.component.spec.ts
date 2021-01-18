import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRechercheComponent } from './filter-recherche.component';

describe('FilterRechercheComponent', () => {
  let component: FilterRechercheComponent;
  let fixture: ComponentFixture<FilterRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
