import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserFormComponent } from '../../user/user-form/user-form.component';
import { ToastService } from '../../utils/service/toast.service';
import { AuthService } from '../../authentication/service/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../service/language.service';
import { LanguageInterface } from '../../interface/language.interface';
import { UserSettingService } from '../../user/service/user-setting.service';
import { UserSettingUpdate } from '../../user/interface/user-setting-update.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyInterface } from '../../interface/currency.interface';
import { CurrencyService } from '../../service/currency.service';
import { DrawerComponent } from "./drawer/drawer.component";

@Component({
  selector: 'app-layout',
  imports: [Menubar, CommonModule, RouterOutlet, RouterLink, DynamicDialogModule, InputTextModule,
    DrawerModule, SelectModule, FormsModule, TranslatePipe, DrawerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class LayoutComponent implements OnInit {

  public openDrawer = false;
  public languages: LanguageInterface[] = [];
  public languageSelected = '';
  public languageLabelSelected = '';

  public currency: CurrencyInterface[] = [];
  public currencySelected = '';
  public currencyLabelSelected = '';

  private _authService = inject(AuthService);
  private _dialogService = inject(DialogService);
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _toastService = inject(ToastService);
  private _languageService = inject(LanguageService);
  private _userSettingService = inject(UserSettingService);
  private _translateService = inject(TranslateService);
  private _currencyService = inject(CurrencyService);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.getAllLanguages();
    this.getAllCurrency();
    this.loadMenus();
    this.languageSelected = this._authService.currentLanguage();
    this.currencySelected = this._authService.currentCurrency()?.code ?? '';
  }

  toggleDrawer() {
    this.openDrawer = !this.openDrawer;
  }

  selectedLanguage(event: any) {
    this._authService.setLanguage(event.value);
    const setting: UserSettingUpdate = {
      id: this._authService.currentUserSettingId(),
      currency: '',
      language: event.value,
      notifications: false,
      theme: 'dark',
    };
    this._userSettingService.updateLanguage(setting).subscribe({
      next: (response) => {
      }
    });
  }

  selectedCurrency(event: any) {
    this._authService.setCurrency(event.value);
    const setting: UserSettingUpdate = {
      id: this._authService.currentUserSettingId(),
      currency: event.value,
      language: '',
      notifications: false,
      theme: 'dark',
    };
    this._userSettingService.updateCurrency(setting).subscribe({
      next: (response) => {
      }
    });
  }

  getAllLanguages() {
    this.languages = this._languageService.getAllLanguage();
  }

  getAllCurrency() {
    this.currency = this._currencyService.getAllCurrency();
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
}