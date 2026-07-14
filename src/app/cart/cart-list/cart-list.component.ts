import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const customerId = localStorage.getItem('userId');
    if (!customerId) return;

    this.cartService.getCartItems(customerId).subscribe((data: any) => {
      this.cartItems = data || [];
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      const price = Number(item.product?.price || item.price || 0);
      const qty = Number(item.quantity || 1);
      total += price * qty;
    }
    return total;
  }

  clearCart(): void {
    const customerId = localStorage.getItem('userId');
    if (!customerId) {
      alert('Please login first.');
      return;
    }
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.cartService.clearCart().subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item._id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item._id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item._id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  checkout(): void {
    const customerId = localStorage.getItem('userId');
    if (!customerId) {
      alert('Please login first.');
      return;
    }
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}
