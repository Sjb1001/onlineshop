import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoreCategoryComponent } from './manage-store-category.component';

describe('ManageStoreCategoryComponent', () => {
  let component: ManageStoreCategoryComponent;
  let fixture: ComponentFixture<ManageStoreCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStoreCategoryComponent]
    });
    fixture = TestBed.createComponent(ManageStoreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
