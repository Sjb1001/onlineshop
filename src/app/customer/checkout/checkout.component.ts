import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];

  total = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.loadCart();

  }

  loadCart() {

    const customerId = localStorage.getItem("userId");

    if (!customerId) return;

    this.cartService.getCartItems(customerId).subscribe((data: any) => {

      this.cartItems = data;

      this.total = 0;

      this.cartItems.forEach(item => {

        this.total += item.price;

      });

    });

  }
  placeOrder() {

  const customer = localStorage.getItem("userId");

  if (!customer || this.cartItems.length === 0) {

    return;

  }

  const order = {

    customer,

    store: this.cartItems[0].store,

    items: this.cartItems.map(item => ({

      product: item._id,

      quantity: 1,

      price: item.price

    })),

    total: this.total

  };

  this.orderService.placeOrder(order).subscribe({

    next: () => {

      alert("Order Placed!");

    },

    error: err => {

      console.log(err);

    }

  });

}

}
