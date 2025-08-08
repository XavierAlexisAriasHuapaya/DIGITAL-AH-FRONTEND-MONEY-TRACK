import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../utils/service/toast.service';
import { BankAccountPagination } from '../interface/bank-account-pagination.interface';
import { MenuItem } from 'primeng/api';
import { debounceTime } from 'rxjs';
import { BankAccountService } from '../service/bank-account.service';
import { BankFormComponent } from '../bank-form/bank-form.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bank-list',
  imports: [TableModule, CommonModule, IconField, InputIcon, InputTextModule,
    ButtonModule, DynamicDialogModule, Menu, PaginatorModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class BankListComponent implements OnInit, OnDestroy {

  private readonly _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _bankAccountService = inject(BankAccountService);
  private readonly _toastService = inject(ToastService);
  private _translateService = inject(TranslateService);

  public bankAccounts: BankAccountPagination[] = [];
  public items: MenuItem[] = [];

  public page: number = 0;
  public pageSize: number = 5;
  public totalElements: number = 0;
  public searchControl = new FormControl('');

  ngOnDestroy(): void {
    if (this._dynamicDialogRef) {
      this._dynamicDialogRef.close();
    }
  }
  ngOnInit(): void {
    this.paginationBankAccount();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(value => {
        this.paginationBankAccount(value ?? '');
      });
  }

  openToggle(menu: Menu, event: any, id: number) {
    const label = this._translateService.instant('Options');
    const itemEdit = this._translateService.instant('Edit');
      this.items = [
        {
          label: label,
          items: [
            {
              label: itemEdit,
              icon: 'pi pi-pen-to-square',
              command: () => {
                this.updateBankAccount(id);
              }
            }
          ]
        }
      ];
    menu.toggle(event);
  }

  onPagination(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.paginationBankAccount();
  }

  paginationBankAccount(search?: string) {
    this._bankAccountService.pagination(this.page, this.pageSize, search ?? '').subscribe({
      next: (response) => {
        this.bankAccounts = response.content;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        this._toastService.showToast('Error', error.message, 'bottom-center');
      }
    })
  }

  createBankAccount() {
    const headerText = this._translateService.instant('Create Bank Account');
    this._dynamicDialogRef = this._dialogService.open(BankFormComponent, {
      header: headerText,
      dismissableMask: true,
      width: '25%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
    this._dynamicDialogRef.onClose.subscribe((data) => {
      if (data) {
        let message: string = data.message;
        if (message.includes('Successfully')) {
          this.paginationBankAccount();
        }
      }
    });
  }

  updateBankAccount(id: number) {
    const headerText = this._translateService.instant('Update Bank Account');
    this._dynamicDialogRef = this._dialogService.open(BankFormComponent, {
      header: headerText,
      dismissableMask: true,
      width: '25%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        request: {
          id: id
        }
      }
    });
    this._dynamicDialogRef.onClose.subscribe((data) => {
      if (data) {
        let message: string = data.message;
        if (message.includes('Successfully')) {
          this.paginationBankAccount();
        }
      }
    });
  }
}
