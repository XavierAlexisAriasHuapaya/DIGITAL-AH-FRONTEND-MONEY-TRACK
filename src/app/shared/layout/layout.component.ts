import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserFormComponent } from '../../user/user-form/user-form.component';
import { ToastService } from '../../utils/service/toast.service';
import { AuthService } from '../../authentication/service/auth.service';


@Component({
  selector: 'app-layout',
  imports: [Menubar, CommonModule, RouterOutlet, RouterLink, DynamicDialogModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class LayoutComponent implements OnInit {

  private _authService = inject(AuthService);
  private _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _toastService = inject(ToastService);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        route: '/main/dashboard'
      },
      {
        label: 'Maintenance',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'User',
            command: () => {
              this.openUser();
            }
          },
          {
            label: 'Category',
            route: '/main/category/list'
          },
          {
            label: 'Bank',
            route: '/main/bank/list'
          }
        ]
      },
      {
        label: 'Transaction',
        icon: 'pi pi-wallet',
        route: '/main/transaction/list'
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      },
    ];
  }

  logout() {
    this._authService.logout();
  }

  openUser() {
    this._dynamicDialogRef = this._dialogService.open(UserFormComponent, {
      header: 'Update User',
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
          id: 1
        }
      }
    });

    this._dynamicDialogRef.onClose.subscribe((data) => {
      if (data) {
        let message: string = data.message;
        if (message.includes('Successfully')) {
          this._toastService.showToast('success', data.message, 'bottom-center')
        }
      }
    })
  }
}