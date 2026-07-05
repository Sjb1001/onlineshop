import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  name = "";
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      }
    });
  }

  addCategory() {

    if (!this.name.trim()) {
      alert("Enter category name.");
      return;
    }

    this.categoryService.addCategory({
      name: this.name
    }).subscribe({

      next: () => {
        this.name = "";
        this.loadCategories();
      },

      error: (err) => {
        alert(err.error.message);
      }

    });

  }

  deleteCategory(id: string) {

    if (!confirm("Delete this category?")) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
      }
    });

  }

}
