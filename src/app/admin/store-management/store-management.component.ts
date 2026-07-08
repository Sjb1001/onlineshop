import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/seller/store.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.css']
})
export class StoreManagementComponent implements OnInit {

  stores: any[] = [];
  categories: any[] = [];

  constructor(private storeService: StoreService,
              private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadStores();
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  loadStores() {
    this.storeService.getStores().subscribe({
      next: (data: any) => {
        this.stores = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  approve(id: string) {
    this.storeService.approveStore(id).subscribe({
      next: () => {
        alert("Store Approved!");
        this.loadStores();
      }
    });
  }

  reject(id: string) {
    this.storeService.rejectStore(id).subscribe({
      next: () => {
        alert("Store Rejected!");
        this.loadStores();
      }
    });
  }

  saveCategories(store: any) {
    this.storeService.assignCategories(
    store._id,
    store.allowedCategories
  ).subscribe({

    next: () => {

      alert("Categories Assigned!");

      this.loadStores();

    }

  });

}

}

