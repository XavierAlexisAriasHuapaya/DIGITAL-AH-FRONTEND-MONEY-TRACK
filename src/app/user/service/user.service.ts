import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUpdate } from '../interface/user-update.interface';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { UserUpdatePassword } from '../interface/user-update-password.interface';
import { UserFindOne } from '../interface/user-find-one.interface';
import { AuthService } from '../../authentication/service/auth.service';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);

  update(user: UserUpdate): Observable<ResponseInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/user`;
    return this._httpClient.patch<ResponseInterface>(url, user, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error.error.message);
        })
      );
  }

  findById(): Observable<UserFindOne> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/user/${this._authService.currentUserId()}`;
    return this._httpClient.get<UserFindOne>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updatePassword(user: UserUpdatePassword): Observable<ResponseInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/user/password`;
    return this._httpClient.patch<ResponseInterface>(url, user, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

}
