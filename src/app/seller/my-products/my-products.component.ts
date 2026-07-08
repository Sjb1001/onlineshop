import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  products: any[] = [];

  constructor(
    private storeService: StoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    const ownerId = localStorage.getItem("userId");

    if (ownerId) {

      this.storeService.getStoreByOwner(ownerId).subscribe((store: any) => {

        if (store) {

          this.productService
            .getProductsByStore(store._id)
            .subscribe((data: any) => {

              this.products = data;

            });

        }

      });

    }

  }
  deleteProduct(id: string) {

  const confirmed = confirm("Are you sure you want to delete this product?");

  if (!confirmed) {
    return;
  }

  this.productService.deleteProduct(id).subscribe({

    next: () => {

      this.products = this.products.filter(
        (p: any) => p._id !== id
      );

      alert("Product deleted successfully!");

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}

}
