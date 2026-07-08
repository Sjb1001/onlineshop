import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../store.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  store: any;

  categories: any[] = [];

  productId = "";

  product = {
    productName: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id') || "";

    const ownerId = localStorage.getItem("userId");

    if (ownerId) {

      this.storeService.getStoreByOwner(ownerId).subscribe((store: any) => {

        this.store = store;
        this.categories = store.allowedCategories;

      });

    }

    this.productService.getProduct(this.productId).subscribe((data: any) => {

      this.product = {
        productName: data.productName,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category._id
      };

    });

  }

  updateProduct() {

  const data = {
    ...this.product,
    store: this.store._id
  };

  console.log("Product ID:", this.productId);
  console.log("Updating with:", data);

  this.productService
    .updateProduct(this.productId, data)
    .subscribe({

      next: (res: any) => {

        console.log("UPDATE RESPONSE:", res);

        alert("Product Updated!");

      },

      error: (err: any) => {

        console.log("UPDATE ERROR:", err);

      }

    });

}

}
