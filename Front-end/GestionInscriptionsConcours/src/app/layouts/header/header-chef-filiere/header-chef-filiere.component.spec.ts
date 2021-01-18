import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderChefFiliereComponent } from './header-chef-filiere.component';

describe('HeaderChefFiliereComponent', () => {
  let component: HeaderChefFiliereComponent;
  let fixture: ComponentFixture<HeaderChefFiliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderChefFiliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderChefFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
