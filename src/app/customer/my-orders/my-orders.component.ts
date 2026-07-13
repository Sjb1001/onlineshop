import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders() {

    const customerId = localStorage.getItem("userId");

    if (!customerId) return;

    this.orderService.getCustomerOrders(customerId).subscribe({

      next: (data: any) => {

        this.orders = data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  cancelOrder(order: any) {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    this.orderService.cancelOrder(order._id).subscribe({

      next: () => {

        alert("Order cancelled successfully!");

        this.loadOrders();

      },

      error: (err: any) => {

        alert(err.error.message);

      }

    });

  }

  writeReview(product: any) {
    if (!product?._id) {
      alert('Product information is missing.');
      return;
    }

    this.router.navigate(['/review'], {
      queryParams: { productId: product._id }
    });
  }

}
