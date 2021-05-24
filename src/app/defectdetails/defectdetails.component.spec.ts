import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectdetailsComponent } from './defectdetails.component';

describe('DefectdetailsComponent', () => {
  let component: DefectdetailsComponent;
  let fixture: ComponentFixture<DefectdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
