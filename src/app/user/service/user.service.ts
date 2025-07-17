import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserUpdate } from '../interface/user-update.interface';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { UserUpdatePassword } from '../interface/user-update-password.interface';
import { UserFindOne } from '../interface/user-find-one.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);

  update(user: UserUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/user`;
    return this._httpClient.patch<ResponseInterface>(url, user)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error.message);
        })
      );
  }

  findById(id: number): Observable<UserFindOne> {
    const url = `${this._endPoint}/user/${id}`;
    return this._httpClient.get<UserFindOne>(url).pipe(
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
    const url = `${this._endPoint}/user/password`;
    return this._httpClient.patch<ResponseInterface>(url, user)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

}
