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

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, SelectModule, TranslatePipe, FormsModule],
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

  private _authService = inject(AuthService);
  private _userSettingService = inject(UserSettingService);
  private _languageService = inject(LanguageService);
  private _currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this.getAllLanguages();
    this.getAllCurrency();
    this.languageSelected = this._authService.currentLanguage();
    this.currencySelected = this._authService.currentCurrency()?.code ?? '';
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

  onCloseDrawer() {
    this.closeDrawer.emit(false);
  }

}
