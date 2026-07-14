import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-delivery-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.css']
})
export class DeliveryMapComponent implements OnChanges {

  @Input() storeLat!: number;
  @Input() storeLng!: number;

  @Input() customerLat!: number;
  @Input() customerLng!: number;

  map: any;

  ngOnChanges(changes: SimpleChanges): void {

    if (
      this.storeLat &&
      this.storeLng &&
      this.customerLat &&
      this.customerLng
    ) {

      this.loadMap();

    }

  }

  loadMap() {

    if (this.map) {

      this.map.remove();

    }

    this.map = L.map('map').setView(

      [

        this.storeLat,

        this.storeLng

      ],

      13

    );

    L.tileLayer(

      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

      {

        maxZoom:19

      }

    ).addTo(this.map);

    L.marker([

      this.storeLat,

      this.storeLng

    ])
    .addTo(this.map)
    .bindPopup("🏪 Store");

    L.marker([

      this.customerLat,

      this.customerLng

    ])
    .addTo(this.map)
    .bindPopup("🏠 Customer");

    const bounds = L.latLngBounds([

      [

        this.storeLat,

        this.storeLng

      ],

      [

        this.customerLat,

        this.customerLng

      ]

    ]);

    this.map.fitBounds(bounds);

  }

}
