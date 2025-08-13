import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CategoryService } from '../service/category.service';
import { CategoryCreate } from '../interface/category-create.interface';
import { CategoryUpdate } from '../interface/category-update.interface';
import { ToastService } from '../../utils/service/toast.service';
import { AuthService } from '../../authentication/service/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-category-form',
  imports: [ButtonModule, InputTextModule, FloatLabel, SelectModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {

  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _dyanmicDialogConfig = inject(DynamicDialogConfig);
  private _formBuilder = inject(FormBuilder);
  private _categoryService = inject(CategoryService);
  private _authService = inject(AuthService);
  private readonly _toastService = inject(ToastService);

  public id?: number;
  public typeMovement = [
    {
      name: 'Expense',
      code: 'EXPENSE'
    },
    {
      name: 'Income',
      code: 'INCOME'
    }
  ];
  public myForm = this._formBuilder.group({
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
    user: this._formBuilder.group({
      id: [this._authService.currentUserId(), [Validators.required]]
    })
  });


  ngOnInit(): void {
    let data = this._dyanmicDialogConfig.data;
    if (data) {
      this.id = this._dyanmicDialogConfig.data.request.id;
      if (this.id) {
        this._categoryService.findByIdCategory(this.id).subscribe({
          next: (response) => {
            this.myForm.patchValue({
              type: response.type.toString(),
              description: response.description,
              user: {
                id: response.id
              }
            });
          },
          error: (error) => {
            this._toastService.showToast('error', error, 'bottom-center');
          }
        })
      }
    }
  }

  close() {
    this._dynamicDialogRef.close();
  }

  create() {
    const category: CategoryCreate = {
      description: this.myForm.get('description')?.value ?? '',
      type: this.myForm.get('type')?.value ?? '',
      user: {
        id: this.myForm.get('user')?.get('id')?.value ?? 0
      }
    };
    this._categoryService.createCategory(category).subscribe({
      next: (response) => {
        if (response.response.includes('Successfully')) {
          this._dynamicDialogRef.close({
            message: response.response,
          });
          this._toastService.showToast('success', response.response, 'bottom-center');
        } else {
          this._toastService.showToast('warn', response.response, 'bottom-center');
        }
      },
      error: (error) => {
        this._toastService.showToast('error', error.message, 'bottom-center');
      }
    })
  }

  update() {
    const category: CategoryUpdate = {
      id: this.id ?? 0,
      description: this.myForm.get('description')?.value ?? '',
      type: this.myForm.get('type')?.value ?? ''
    };
    this._categoryService.updateCategory(category).subscribe({
      next: (response) => {
        if (response.response.includes('Successfully')) {
          this._dynamicDialogRef.close({
            message: response.response,
          });
          this._toastService.showToast('success', response.response, 'bottom-center');
        } else {
          this._toastService.showToast('warn', response.response, 'bottom-center');
        }
      },
      error: (error) => {
        this._toastService.showToast('error', error.message, 'bottom-center');
      }
    })
  }

}
