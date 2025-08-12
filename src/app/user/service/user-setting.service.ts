import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserSettingFindOne } from '../interface/user-setting-find-one.interface';
import { AuthService } from '../../authentication/service/auth.service';
import { UserSettingUpdate } from '../interface/user-setting-update.interface';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  private readonly _endPoint = environments.endPoint;
  private _httpCliente = inject(HttpClient);
  private _authService = inject(AuthService);
  private _currentLanguage = signal<string | ''>('en');

  public currentLanguage = computed(() => this._currentLanguage());

  updateLanguage(userSetting: UserSettingUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/user-setting/user/${this._authService.currentUserId()}`;
    const headers = this._authService.getHeaderToken();
    return this._httpCliente.get<UserSettingFindOne>(url, { headers })
      .pipe(
        switchMap((response) => {
          response.language = userSetting.language;
          const url = `${this._endPoint}/user-setting`;
          return this._httpCliente.patch<ResponseInterface>(url, response, { headers })
        }),
        catchError((error) => throwError(() => error))
      )
  }

  updateCurrency(userSetting: UserSettingUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/user-setting/user/${this._authService.currentUserId()}`;
    const headers = this._authService.getHeaderToken();
    return this._httpCliente.get<UserSettingFindOne>(url, { headers })
      .pipe(
        switchMap((response) => {
          response.currency = userSetting.currency;
          const url = `${this._endPoint}/user-setting`;
          return this._httpCliente.patch<ResponseInterface>(url, response, { headers })
        }),
        catchError((error) => throwError(() => error))
      )
  }

  updateTheme(userSetting: UserSettingUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/user-setting/user/${this._authService.currentUserId()}`;
    const headers = this._authService.getHeaderToken();
    return this._httpCliente.get<UserSettingFindOne>(url, { headers })
      .pipe(
        switchMap((response) => {
          response.theme = userSetting.theme;
          const url = `${this._endPoint}/user-setting`;
          return this._httpCliente.patch<ResponseInterface>(url, response, { headers })
        }),
        catchError((error) => throwError(() => error))
      )
  }

}
