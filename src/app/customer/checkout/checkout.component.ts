import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { OrderService } from '../../services/order.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];

  total = 0;

  deliveryAddress = "";
  deliveryLatitude: number | null = null;
  deliveryLongitude: number | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadCart();

  }

    getCurrentLocation() {

  if (!navigator.geolocation) {

    alert("Geolocation not supported.");

    return;

  }

  navigator.geolocation.getCurrentPosition(position => {

    this.deliveryLatitude = position.coords.latitude;

    this.deliveryLongitude = position.coords.longitude;

    this.loadMap();

  });

}
map!: L.Map;
marker!: L.Marker;

loadMap() {

  if (this.map) {

    this.map.remove();

  }

  this.map = L.map('checkoutMap').setView(

    [

      this.deliveryLatitude!,

      this.deliveryLongitude!

    ],

    15

  );

  L.tileLayer(

    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

    {

      maxZoom:19

    }

  ).addTo(this.map);

  this.marker = L.marker(
  [
    this.deliveryLatitude!,
    this.deliveryLongitude!
  ],
  {
    draggable: true
  }
).addTo(this.map);

// Add this immediately after the marker is added
setTimeout(() => {
  this.map.invalidateSize();
}, 100);

  this.marker.on('dragend', () => {

    const pos = this.marker.getLatLng();

    this.deliveryLatitude = pos.lat;

    this.deliveryLongitude = pos.lng;

    this.getAddressFromCoordinates();

  });

}

  loadCart() {

    const customerId = localStorage.getItem("userId");

    if (!customerId) return;

    this.cartService.getCartItems(customerId).subscribe((data: any) => {

       console.log(data);

      this.cartItems = data;

      this.total = 0;

      this.cartItems.forEach(item => {

  this.total += item.product.price * item.quantity;

});

    });

  }
  placeOrder() {
    console.log("Place Order clicked");

  const customer = localStorage.getItem("userId");

  if (!customer || this.cartItems.length === 0) {

    return;

  }

  const order = {

  customer,

  store: this.cartItems[0].store,

  items: this.cartItems.map(item => ({

  product: item.product._id,

  quantity: item.quantity,

  price: item.product.price

  })),

  total: this.total,

  deliveryAddress: this.deliveryAddress,

  deliveryLatitude: this.deliveryLatitude,

  deliveryLongitude: this.deliveryLongitude

};

  this.orderService.placeOrder(order).subscribe({

    next: () => {

      alert("Order Placed!");

    },

    error: (err) => {

  console.log(err);

  console.log(err.error);

  alert(err.error.message);

}

  });

}

getAddressFromCoordinates() {

  this.http.get<any>(

    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.deliveryLatitude}&lon=${this.deliveryLongitude}`

  ).subscribe({

    next: (data) => {

      this.deliveryAddress = data.display_name;

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}
