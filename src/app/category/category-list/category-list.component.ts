import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CategoryService } from '../service/category.service';
import { CategoryPagination } from '../interface/category-pagination.interface';
import { PaginatorModule } from 'primeng/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs';
import { ToastService } from '../../utils/service/toast.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RowTableSkeletonComponent } from '../../shared/skeleton/row-table-skeleton/row-table-skeleton.component';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-category-list',
  imports: [TableModule, CommonModule, IconField, InputIcon, InputTextModule, ButtonModule,
    DynamicDialogModule, Menu, PaginatorModule, ReactiveFormsModule, TranslatePipe, RowTableSkeletonComponent, Tag],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class CategoryListComponent implements OnInit, OnDestroy {

  private readonly _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _categoryService = inject(CategoryService);
  private readonly _toastService = inject(ToastService);
  private _translateService = inject(TranslateService);

  public categories: CategoryPagination[] = [];
  public items: MenuItem[] = [];

  public page: number = 0;
  public pageSize: number = 5;
  public totalElements: number = 0;
  public searchControl = new FormControl('');
  public loading = signal<boolean>(true);

  ngOnInit() {
    this.loading.set(true);
    this.paginationCategories();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(value => {
        this.paginationCategories(value ?? '');
      });
  }

  openToggle(menu: Menu, event: any, id: number) {
    const labelText = this._translateService.instant('Options');
    const labelItemEdit = this._translateService.instant('Edit');
    this.items = [
      {
        label: labelText,
        items: [
          {
            label: labelItemEdit,
            icon: 'pi pi-pen-to-square',
            command: () => {
              this.updateCategory(id);
            }
          }
        ]
      }
    ];
    menu.toggle(event);
  }

  paginationCategories(search?: string) {
    this.loading.set(true);
    this._categoryService.paginationCategories(this.page, this.pageSize, search)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.totalElements = response.totalElements;
          this.categories = response.content;
        },
        error: (error) => {
          this.loading.set(true);
          this._toastService.showToast('error', error.message, 'bottom-center');
        }
      })
  }

  onPagination(event: any) {
    this.page = event.page;
    this.pageSize = event.rows;
    this.paginationCategories();
  }

  createCategory() {
    const headerText = this._translateService.instant('Create Category');
    this._dynamicDialogRef = this._dialogService.open(CategoryFormComponent, {
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
          this.paginationCategories();
        }
      }
    });
  }

  updateCategory(id: number) {
    const headerText = this._translateService.instant('Update Category');
    this._dynamicDialogRef = this._dialogService.open(CategoryFormComponent, {
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
          id: id,
        }
      }
    });
    this._dynamicDialogRef.onClose.subscribe((data) => {
      if (data) {
        let message: string = data.message;
        if (message.includes('Successfully')) {
          this.paginationCategories();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this._dynamicDialogRef) {
      this._dynamicDialogRef.close();
    }
  }
}
