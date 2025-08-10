import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../../authentication/service/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../utils/service/toast.service';
import { UserFormComponent } from '../../../user/user-form/user-form.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-menubar',
  imports: [CommonModule, Menubar, RouterLink, TranslatePipe, InputTextModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class MenubarComponent implements OnInit {

  public items: MenuItem[] | undefined;

  @Output() openDrawer = new EventEmitter<boolean>();
  public isDrawerOpen = false;

  private _authService = inject(AuthService);
  private _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _toastService = inject(ToastService);
  private _translateService = inject(TranslateService);

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
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
    const headerText = this._translateService.instant('Update User');
    this._dynamicDialogRef = this._dialogService.open(UserFormComponent, {
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

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.openDrawer.emit(this.isDrawerOpen);
    this.isDrawerOpen = !this.isDrawerOpen;
  }

}
