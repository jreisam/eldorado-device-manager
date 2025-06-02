import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateComponent } from './category-create.component';

describe('CategoryCreate', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
