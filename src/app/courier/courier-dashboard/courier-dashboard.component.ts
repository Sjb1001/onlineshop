import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { DeliveryMapComponent } from '../../shared/delivery-map/delivery-map.component';

@Component({
  selector: 'app-courier-dashboard',
  standalone: true,
  imports: [CommonModule, DeliveryMapComponent],
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.css'],
})
export class CourierDashboardComponent implements OnInit {

  availableOrders: any[] = [];

  myOrders: any[] = [];

  courierId = "";

  selectedOrder: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.courierId = localStorage.getItem("userId") || "";

    this.loadAvailable();

    this.loadMine();

  }

  loadAvailable() {

    this.orderService.getAvailableDeliveries().subscribe({

      next: (data: any) => {

        this.availableOrders = data;

      }

    });

  }

  loadMine() {

    this.orderService.getCourierDeliveries(this.courierId).subscribe({

      next: (data: any) => {

        this.myOrders = data;

      }

    });

  }

  accept(order: any) {

    this.orderService.acceptDelivery(order._id, this.courierId).subscribe({

      next: () => {

        this.loadAvailable();

        this.loadMine();

      }

    });

  }

  updateStatus(order: any, status: string) {

    this.orderService.updateDeliveryStatus(order._id, status).subscribe({

      next: () => {

        this.loadMine();

      }

    });

  }

  viewMap(order: any) {

  this.selectedOrder = order;

  console.log(this.selectedOrder);

}

}
