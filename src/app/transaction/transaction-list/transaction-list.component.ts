import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../utils/service/toast.service';
import { TransactionPagination } from '../interface/transaction-pagination.interface';
import { TransactionService } from '../service/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-list',
  imports: [TableModule, CommonModule, IconField, InputIcon, InputTextModule,
    ButtonModule, DynamicDialogModule, Menu, PaginatorModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class TransactionListComponent implements OnInit {

  private readonly _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _transactionService = inject(TransactionService);
  private _translateService = inject(TranslateService);

  public transactionData: TransactionPagination[] = [];
  public items: MenuItem[] = [];

  public page: number = 0;
  public pageSize: number = 5;
  public totalElements: number = 0;
  public searchControl = new FormControl('');

  ngOnInit(): void {
    this.paginationTransaction();
  }


  openToggle(menu: Menu, event: any, id: number) {
    const itemLabel = this._translateService.instant('Options');
    const itemEdit = this._translateService.instant('Edit');
    this.items = [
      {
        label: itemLabel,
        items: [
          {
            label: itemEdit,
            icon: 'pi pi-pen-to-square',
            command: () => {
              this.updateTransaction(id);
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
    this.paginationTransaction();
  }

  paginationTransaction() {
    this._transactionService.pagination(this.page, this.pageSize, this.searchControl.value ?? '').subscribe({
      next: (response) => {
        this.transactionData = response.content;
        this.totalElements = response.totalElements;
      }
    })
  }

  createTransaction() {
    const headerText = this._translateService.instant('Create Transaction');
    this._dynamicDialogRef = this._dialogService.open(TransactionFormComponent, {
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
      }
    });
    this._dynamicDialogRef.onClose.subscribe((data) => {
      if (data) {
        let message: string = data.message;
        if (message.includes('Successfully')) {
          this.paginationTransaction();
        }
      }
    })
  }

  updateTransaction(id: number) {

  }

}
