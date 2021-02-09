import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesComponentComponent } from './cases-component.component';

describe('CasesComponentComponent', () => {
  let component: CasesComponentComponent;
  let fixture: ComponentFixture<CasesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
