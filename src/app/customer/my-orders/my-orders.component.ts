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

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {

    const customerId = localStorage.getItem("userId");

    if (customerId) {

      this.orderService.getCustomerOrders(customerId).subscribe({

        next: (data: any) => {

          this.orders = data;

          console.log(this.orders);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

    }

  }
    writeReview(product: any): void {

    this.router.navigate(
      ['/customer/review'],
      {
        queryParams: {
          product: product._id
        }
      }
    );

  }

}


