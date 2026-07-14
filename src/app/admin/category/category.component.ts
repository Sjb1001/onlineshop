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
  editing = false;
  editingId = "";

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

      alert("Category added successfully!");

      // Clear the textbox
      this.name = "";

      // Reload the table
      this.loadCategories();

      // Scroll to the top smoothly (optional)
      window.scrollTo({

        top: 0,

        behavior: 'smooth'

      });

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

  editCategory(category: any) {

    this.name = category.name;

    this.editing = true;

    this.editingId = category._id;

}

updateCategory() {

  if (!this.name.trim()) {

    alert("Enter category name.");

    return;

  }

  this.categoryService.updateCategory(

    this.editingId,

    {

      name: this.name

    }

  ).subscribe({

    next: () => {

      alert("Category updated successfully!");

      // Reset everything
      this.name = "";

      this.editing = false;

      this.editingId = "";

      // Reload the category list
      this.loadCategories();

      // Scroll back to the top (optional)
      window.scrollTo({

        top: 0,

        behavior: 'smooth'

      });

    },

    error: (err) => {

      console.log(err);

    }

  });

} 

}
