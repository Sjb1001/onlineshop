import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  fullname = "";
  store: any = null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {

    this.fullname = localStorage.getItem("fullname") || "";

    const ownerId = localStorage.getItem("userId");

    if (ownerId) {

      this.storeService.getStoreByOwner(ownerId)
        .subscribe({

          next: (data: any) => {

            this.store = data;

            console.log(this.store);

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }

}
