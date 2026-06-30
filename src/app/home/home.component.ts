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
    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.length;
    });
  }

}
