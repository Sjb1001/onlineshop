import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartCount();
  }

  loadCartCount(): void {
    const customerId = localStorage.getItem("userId");

if (customerId) {

  this.cartService.getCartItems(customerId).subscribe((items: any) => {

    this.cartCount = items.length;

  });

}
  }

}
