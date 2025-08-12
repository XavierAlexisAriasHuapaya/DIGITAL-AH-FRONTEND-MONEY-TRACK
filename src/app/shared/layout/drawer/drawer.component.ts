import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../../authentication/service/auth.service';
import { LanguageInterface } from '../../../interface/language.interface';
import { CurrencyInterface } from '../../../interface/currency.interface';
import { UserSettingUpdate } from '../../../user/interface/user-setting-update.interface';
import { UserSettingService } from '../../../user/service/user-setting.service';
import { LanguageService } from '../../../service/language.service';
import { CurrencyService } from '../../../service/currency.service';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToastService } from '../../../utils/service/toast.service';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, SelectModule, TranslatePipe, FormsModule, ToggleSwitchModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit {

  @Input() OpenDrawer = false;
  @Output() closeDrawer = new EventEmitter<boolean>();

  public languages: LanguageInterface[] = [];
  public languageSelected = '';
  public languageLabelSelected = '';

  public currency: CurrencyInterface[] = [];
  public currencySelected = '';
  public currencyLabelSelected = '';
  public darkCheck: boolean = false;

  private _authService = inject(AuthService);
  private _userSettingService = inject(UserSettingService);
  private _languageService = inject(LanguageService);
  private _currencyService = inject(CurrencyService);
  private _toastService = inject(ToastService);

  ngOnInit(): void {
    this.getAllLanguages();
    this.getAllCurrency();
    this.languageSelected = this._authService.currentLanguage();
    this.currencySelected = this._authService.currentCurrency()?.code ?? '';
    this.darkCheck = this._authService.currentAppearance().includes('dark') ? true : false;
  }

  toggleTheme(event: any) {
    const theme = event.checked ? 'dark' : 'light';
    this._authService.setAppearance(theme);
    const setting: UserSettingUpdate = {
      id: this._authService.currentUserSettingId(),
      currency: '',
      language: event.value,
      notifications: false,
      theme: theme,
    };
    this._userSettingService.updateTheme(setting).subscribe({
      next: () => {
        this._toastService.showToast('success', 'Settings updated', 'bottom-center');
      }
    });
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
      next: () => {
        this._toastService.showToast('success', 'Settings updated', 'bottom-center');
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
      next: () => {
        this._toastService.showToast('success', 'Settings updated', 'bottom-center');
      }
    });
  }

  getAllLanguages() {
    this.languages = this._languageService.getAllLanguage();
  }

  getAllCurrency() {
    this.currency = this._currencyService.getAllCurrency();
  }

  onCloseDrawer() {
    this.closeDrawer.emit(false);
  }

}
