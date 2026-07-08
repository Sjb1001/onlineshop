import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/seller/store.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-manage-store-category',
  templateUrl: './manage-store-category.component.html',
  styleUrls: ['./manage-store-category.component.css']
})
export class ManageStoreCategoryComponent implements OnInit {

  store: any;
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    if (id) {
      this.storeService.getStore(id).subscribe((data: any) => {
        this.store = data;
      });
    }

  }

  isChecked(categoryId: string): boolean {

    if (!this.store) return false;

    return this.store.allowedCategories.some(
      (c: any) => c._id === categoryId
    );

  }

  toggleCategory(categoryId: string, checked: boolean) {

    if (checked) {

      this.store.allowedCategories.push({
        _id: categoryId
      });

    } else {

      this.store.allowedCategories =
        this.store.allowedCategories.filter(
          (c: any) => c._id !== categoryId
        );

    }

  }

  save() {

    const ids = this.store.allowedCategories.map(
      (c: any) => c._id
    );

    this.storeService.assignCategories(
      this.store._id,
      ids
    ).subscribe(() => {

      alert("Categories updated!");

    });

  }

}
