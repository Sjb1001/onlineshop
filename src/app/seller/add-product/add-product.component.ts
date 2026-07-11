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

  selectedFile!: File;

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

  onFileSelected(event: any) {

  if (event.target.files.length > 0) {

    this.selectedFile = event.target.files[0];

  }

}

  saveProduct() {

  const formData = new FormData();

  formData.append("productName", this.product.productName);
  formData.append("description", this.product.description);
  formData.append("category", this.product.category);
  formData.append("price", this.product.price.toString());
  formData.append("stock", this.product.stock.toString());
  formData.append("store", this.store._id);

  if (this.selectedFile) {
    formData.append("image", this.selectedFile);
  }

  this.productService.createProduct(formData).subscribe({

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
