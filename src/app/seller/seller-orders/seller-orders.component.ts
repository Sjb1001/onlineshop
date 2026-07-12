import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderService } from '../../services/order.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  orders: any[] = [];
  store: any;

  statuses = [
    'Pending',
    'Preparing',
    'Ready for Pickup',
    'Shipped',
    'Delivered'
  ];

  constructor(
    private orderService: OrderService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {

    const ownerId = localStorage.getItem("userId");

    if (!ownerId) return;

    this.storeService.getStoreByOwner(ownerId).subscribe({

      next: (store: any) => {

    console.log("STORE FROM DATABASE:", store);
    console.log("STORE ID:", store._id);

    this.store = store;

    this.loadOrders();

},

      error: (err: any) => console.log(err)

    });

  }

  loadOrders() {

    this.orderService.getStoreOrders(this.store._id).subscribe({

      next: (data: any) => {

    console.log("REQUESTED STORE:", this.store._id);
    console.log("ORDERS RETURNED:", data);

    this.orders = data;

},

      error: (err: any) => console.log(err)

    });

  }

  updateStatus(order: any) {

  this.orderService.updateOrderStatus(

    order._id,

    order.status

  ).subscribe({

    next: () => {

      alert("Order status updated!");

      this.loadOrders();

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}

}
