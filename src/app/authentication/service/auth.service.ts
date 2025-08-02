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

  public currentUsername = computed(() => this._currentUsername());
  public currentUserId = computed(() => this._currentUserId());
  public currentAuthStatus = computed(() => this._currentAuthStatus());

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

  logout() {
    localStorage.removeItem('token');
    this._currentUsername.set('');
    this._currentUserId.set(0);
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
    const userId = this.decodeToken(response.jwt).id ?? 0;

    this._currentUsername.set(subject);
    this._currentUserId.set(userId);
    this._currentAuthStatus.set(AuthenticationStatus.authenticated);

    localStorage.setItem('token', response.jwt);
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
