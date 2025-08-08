import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TransactionService } from '../service/transaction.service';
import { ToastService } from '../../utils/service/toast.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from '../../category/service/category.service';
import { CategoryFindAll } from '../../category/interface/category-find-all.interface';
import { BankAccountService } from '../../bank/service/bank-account.service';
import { BankAccountFindAll } from '../../bank/interface/bank-account-find-all.interface';
import { InputNumber } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../../utils/form-utils';
import { TransactionCreate } from '../interface/transaction-create.interface';
import { AuthService } from '../../authentication/service/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-form',
  imports: [ButtonModule, InputTextModule, FloatLabel, SelectModule, ReactiveFormsModule,
    InputNumber, DatePickerModule, CommonModule, TranslatePipe],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  public formUtils = FormUtils;

  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _transactionService = inject(TransactionService);
  private readonly _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  private _categoryService = inject(CategoryService);
  private _bankAccountService = inject(BankAccountService);
  private _authService = inject(AuthService);

  public categoriesData: CategoryFindAll[] = [];
  public bankAccountOriginData: BankAccountFindAll[] = [];
  public bankAccountDestinationData: BankAccountFindAll[] = [];
  public id?: number;
  public bankAccountDestinationReadonly: boolean = true;

  private bankAccountOriginId: number = 0;


  public myForm = this._formBuilder.group({
    user: this._formBuilder.group({
      id: [this._authService.currentUserId(), [Validators.required]]
    }),
    category: this._formBuilder.group({
      id: [null, [Validators.required, Validators.min(1)]]
    }),
    bankAccountOrigin: this._formBuilder.group({
      id: [null, [Validators.required, Validators.min(1)]]
    }),
    bankAccountDestination: this._formBuilder.group({
      id: [null]
    }),
    description: ['', [Validators.required, Validators.minLength(5)]],
    date: [new Date, [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]]
  })

  get getCategoryForm(): FormGroup {
    return this.myForm.get('category') as FormGroup;
  }

  get getBankAccountOriginForm(): FormGroup {
    return this.myForm.get('bankAccountOrigin') as FormGroup;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllBankAccountsOrigin();

    this.myForm.get('bankAccountOrigin.id')?.valueChanges.subscribe(value => {
      this.bankAccountOriginId = value ?? 0;
      this.bankAccountDestinationReadonly = this.bankAccountOriginId > 0 ? false : true;
      if (!this.bankAccountDestinationReadonly) {
        this.getAllBankAccountsDestination(this.bankAccountOriginId);
      }
    })
  }

  getCategories() {
    this._categoryService.findAllCategoryByUserId().subscribe({
      next: (data) => {
        this.categoriesData = data;
      }
    })
  }

  getAllBankAccountsOrigin() {
    this._bankAccountService.getAllBankAccountsByUserId().subscribe({
      next: (data) => {
        this.bankAccountOriginData = data;
      }
    })
  }

  getAllBankAccountsDestination(bankAccountOriginId: number) {
    this._bankAccountService.getAllBankAccountsByUserId().subscribe({
      next: (data) => {
        this.bankAccountDestinationData = data.filter(bankAccount => bankAccount.id !== bankAccountOriginId);;
      }
    })
  }

  create() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const transactionCreate: TransactionCreate = {
      user: {
        id: this.myForm.get('user')?.get('id')?.value ?? 0
      },
      category: {
        id: this.myForm.get('category')?.get('id')?.value ?? 0
      },
      bankAccountOrigin: {
        id: this.myForm.get('bankAccountOrigin')?.get('id')?.value ?? 0
      },
      bankAccountDestination: (this.myForm.get('bankAccountDestination')?.get('id')?.value ?? 0) === 0
        ? null
        : { id: this.myForm.get('bankAccountDestination')?.get('id')?.value ?? 0 },
      description: this.myForm.get('description')?.value ?? '',
      amount: this.myForm.get('amount')?.value ?? 0,
      date: this.myForm.get('date')?.value ?? new Date()
    }
    this._transactionService.createTransaction(transactionCreate).subscribe({
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

  close() {
    this._dynamicDialogRef.close();
  }

}
