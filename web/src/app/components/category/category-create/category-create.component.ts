import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  standalone: false,
})
export class CategoryCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
    });
  }

  createCategory(): void {
    if (this.form.valid) {
      this.categoryService.create(this.form.value).subscribe(() => {
        this.snackBar.open('Categoria criada com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/categories']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
