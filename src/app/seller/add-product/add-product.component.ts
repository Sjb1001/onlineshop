import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  store: any;

  categories: any[] = [];

  product = {

    productName: '',

    description: '',

    price: 0,

    stock: 0,

    category: ''

  };

  constructor(

    private storeService: StoreService,

    private productService: ProductService

  ) {}

  ngOnInit(): void {

    const ownerId = localStorage.getItem("userId");

    if (ownerId) {

      this.storeService.getStoreByOwner(ownerId).subscribe((store: any) => {

        console.log("STORE:", store);
  console.log("CATEGORIES:", store.allowedCategories);

        this.store = store;

        this.categories = store.allowedCategories;

      });

    }

  }

  saveProduct() {

    const data = {

      ...this.product,

      store: this.store._id

    };

    this.productService.createProduct(data).subscribe({

      next: () => {

        alert("Product Added!");

        this.product = {

          productName: '',

          description: '',

          price: 0,

          stock: 0,

          category: ''

        };

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
