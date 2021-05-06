import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasedetailsComponentComponent } from './casedetails-component.component';

describe('CasedetailsComponentComponent', () => {
  let component: CasedetailsComponentComponent;
  let fixture: ComponentFixture<CasedetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasedetailsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasedetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
