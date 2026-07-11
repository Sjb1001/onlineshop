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

  selectedFile!: File;

  productId = "";

  product = {
    productName: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: ''
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
        category: data.category._id,
        image: data.image || ''
      };

    });

  }

onFileSelected(event: any) {

  if (event.target.files.length > 0) {

    this.selectedFile = event.target.files[0];

  }

}

  updateProduct() {

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

  this.productService
    .updateProduct(this.productId, formData)
    .subscribe({

      next: (res: any) => {

        console.log("UPDATE RESPONSE:", res);

        alert("Product Updated!");

        this.router.navigate(['/seller/my-products']);

      },

      error: (err: any) => {

        console.log("UPDATE ERROR:", err);

      }

    });

}

}
