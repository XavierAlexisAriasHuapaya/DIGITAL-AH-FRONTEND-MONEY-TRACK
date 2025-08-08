import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { UserAuthenticationResponse } from '../interface/user-authentication-response.interface';
import { UserAuthenticationRequest } from '../interface/user-authentication-request.interface';
import { AuthenticationStatus } from '../enum/authentication-status.enum';
import { jwtDecode } from "jwt-decode";
import { UserValidateRequest } from '../interface/user-validate-request.interface';
import { UserValidateResponse } from '../interface/user-validate-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);

  private _currentUsername = signal<string | ''>('');
  private _currentUserId = signal<number | 0>(0);
  private _currentAuthStatus = signal<AuthenticationStatus>(AuthenticationStatus.checking);
  private _currentLanguage = signal<string | ''>('');

  public currentUsername = computed(() => this._currentUsername());
  public currentUserId = computed(() => this._currentUserId());
  public currentAuthStatus = computed(() => this._currentAuthStatus());
  public currentLanguage = computed(() => this._currentLanguage());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(request: UserAuthenticationRequest): Observable<boolean> {
    const url = `${this._endPoint}/auth/authenticate`;
    return this._httpClient.post<UserAuthenticationResponse>(url, request).pipe(
      map(response =>
        this.setAuthentication(response)
      ),
      catchError(error =>
        throwError(() => error.error)
      )
    )
  }

  setLanguage(language: string) {
    this._currentLanguage.set(language);
    localStorage.setItem('language', language);
  }

  loginGoogle(): void {
    const url = `${this._endPoint}/oauth2/authorization/google`;
    window.location.href = url;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('language');
    this._currentUsername.set('');
    this._currentUserId.set(0);
    this._currentLanguage.set('en');
    this._currentAuthStatus.set(AuthenticationStatus.notAuthenticated);
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this._endPoint}/auth/validate`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    const validateToken: UserValidateRequest = {
      jwt: token
    };

    return this._httpClient.post<UserValidateResponse>(url, validateToken).pipe(
      map(response => {
        if (response.validate.includes('Invalid')) {
          this.logout();
          return false;
        }

        const userAuthResponse: UserAuthenticationResponse = {
          jwt: token,
          username: ''
        };
        this.setAuthentication(userAuthResponse);
        return true;
      }),
      catchError(() => {
        this._currentAuthStatus.set(AuthenticationStatus.notAuthenticated)
        return of(false);
      })
    )
  }

  private setAuthentication(response: UserAuthenticationResponse): boolean {
    const subject = this.decodeToken(response.jwt).sub ?? '';
    const userId = this.decodeToken(response.jwt).userId ?? 0;
    const language = this.decodeToken(response.jwt).language ?? 'en';
    this._currentUsername.set(subject);
    this._currentUserId.set(userId);
    this._currentAuthStatus.set(AuthenticationStatus.authenticated);

    localStorage.setItem('token', response.jwt);
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', language);
    }
    this._currentLanguage.set(localStorage.getItem('language')?.toString() ?? 'en');
    return true;
  }

  private decodeToken(jwt: string): any {
    const payload: any = jwtDecode(jwt);
    return payload;
  }

  getHeaderToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }


}
