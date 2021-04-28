import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticledetailsComponentComponent } from './articledetails-component.component';

describe('ArticledetailsComponentComponent', () => {
  let component: ArticledetailsComponentComponent;
  let fixture: ComponentFixture<ArticledetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticledetailsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticledetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
