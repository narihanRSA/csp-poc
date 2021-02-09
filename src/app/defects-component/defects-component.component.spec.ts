import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectsComponentComponent } from './defects-component.component';

describe('DefectsComponentComponent', () => {
  let component: DefectsComponentComponent;
  let fixture: ComponentFixture<DefectsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
