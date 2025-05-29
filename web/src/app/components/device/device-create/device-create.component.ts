import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../models/category';
import { DeviceService } from '../../../services/device.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
  standalone: false,
})
export class DeviceCreateComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category_id: ['', Validators.required],
      color: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]],
      part_number: ['', [Validators.required, Validators.min(1)]]
    });

    this.categoryService.findAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  createDevice(): void {
    if (this.form.valid) {
      this.deviceService.create(this.form.value).subscribe(() => {
        this.snackBar.open('Dispositivo criado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/devices']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/devices']);
  }
}
