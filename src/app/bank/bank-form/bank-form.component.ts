import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { BankAccountService } from '../service/bank-account.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastService } from '../../utils/service/toast.service';
import { BankAccountCreate } from '../interface/bank-account-create.interface';
import { BankAccountUpdate } from '../interface/bank-account-update.interface';

@Component({
  selector: 'app-bank-form',
  imports: [ButtonModule, InputTextModule, FloatLabel, SelectModule, ReactiveFormsModule],
  templateUrl: './bank-form.component.html',
  styleUrl: './bank-form.component.css'
})
export class BankFormComponent implements OnInit {

  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _dyanmicDialogConfig = inject(DynamicDialogConfig);
  private _formBuilder = inject(FormBuilder);
  private _bankAccountService = inject(BankAccountService);
  private readonly _toastService = inject(ToastService);

  public id?: number;

  public typeAccount = [
    {
      name: 'Digital',
      code: 'DIGITAL'
    },
    {
      name: 'Cash',
      code: 'CASH'
    },
    {
      name: 'Bank',
      code: 'BANK'
    }
  ];

  public myForm = this._formBuilder.group({
    typeAccount: ['', [Validators.required]],
    name: ['', [Validators.required]],
    user: this._formBuilder.group({
      id: [1, [Validators.required]]
    })
  });

  ngOnInit(): void {
    const data = this._dyanmicDialogConfig.data;
    if (data) {
      this.id = data.request.id;
      this._bankAccountService.findOne(this.id ?? 0).subscribe({
        next: (response) => {
          this.myForm.get('typeAccount')?.setValue(response.typeAccount);
          this.myForm.get('name')?.setValue(response.name);
        }
      })
    }
  }

  create() {
    const bankAccount: BankAccountCreate = {
      typeAccount: this.myForm.get('typeAccount')?.value ?? '',
      name: this.myForm.get('name')?.value ?? '',
      user: {
        id: this.myForm.get('user')?.get('id')?.value ?? 1
      }
    };
    this._bankAccountService.createBankAccount(bankAccount).subscribe({
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
    const bankAccount: BankAccountUpdate = {
      id: this.id ?? 0,
      typeAccount: this.myForm.get('typeAccount')?.value ?? '',
      name: this.myForm.get('name')?.value ?? '',
    };
    this._bankAccountService.updateBankAccount(bankAccount).subscribe({
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
