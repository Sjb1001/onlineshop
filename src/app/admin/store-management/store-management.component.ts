import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/seller/store.service';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.css']
})
export class StoreManagementComponent implements OnInit {

  stores: any[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
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

}
