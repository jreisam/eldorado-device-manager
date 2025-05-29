import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  standalone: false,
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
      this.snackBar.open('Categoria excluída com sucesso!', 'Fechar', {
        duration: 3000,
      });
    });
  }
}
