import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent {
  storeName: string = '';
  description: string = '';
  address: string = '';

  latitude: number | null = null;
longitude: number | null = null;

  constructor(private storeService: StoreService) {}

  createStore(): void {
    // Basic client-side handler — replace with real API call as needed
    console.log('Creating store with', {
      name: this.storeName,
      description: this.description,
      address: this.address,
    });

    const owner = localStorage.getItem("userId");

console.log("Owner from localStorage:", owner);

const storeData = {

  owner,

  storeName: this.storeName,

  description: this.description,

  address: this.address,

  latitude: this.latitude,

  longitude: this.longitude

};
console.log("Sending to backend:", storeData);

    this.storeService.createStore(storeData).subscribe({
      next: () => {
        alert('Store created successfully.');
        this.storeName = '';
        this.description = '';
        this.address = '';
      },
      error: (error) => {
        console.error('Create store failed', error);
        alert('Unable to create store. Please try again.');
      }
    });
  }
}
