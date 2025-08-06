import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PaginationInterface } from '../../utils/interface/pagination.interface';
import { BankAccountPagination } from '../interface/bank-account-pagination.interface';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { BankAccountCreate } from '../interface/bank-account-create.interface';
import { BankAccountUpdate } from '../interface/bank-account-update.interface';
import { BankAccountFindAll } from '../interface/bank-account-find-all.interface';
import { AuthService } from '../../authentication/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);

  createBankAccount(bankAccount: BankAccountCreate): Observable<ResponseInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/bank-account`
    return this._httpClient.post<ResponseInterface>(url, bankAccount, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error.error)
        })
      );
  }

  updateBankAccount(bankAccount: BankAccountUpdate): Observable<ResponseInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/bank-account`
    return this._httpClient.patch<ResponseInterface>(url, bankAccount, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error.error)
        })
      );
  }

  findOne(id: number): Observable<any> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/bank-account/${id}`
    return this._httpClient.get<any>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getAllBankAccountsByUserId(): Observable<BankAccountFindAll[]> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/bank-account/user/${this._authService.currentUserId()}`
    return this._httpClient.get<BankAccountFindAll[]>(url, { headers }).pipe(
      retry(
        {
          count: 3,
          delay: 1200
        }
      ),
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  pagination(page: number, size: number, search: string): Observable<PaginationInterface<BankAccountPagination>> {
    const headers = this._authService.getHeaderToken();
    const params = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sort', 'createdAt,desc')
      .append('search', search);
    const url = `${this._endPoint}/bank-account/pagination/${this._authService.currentUserId()}`
    return this._httpClient.get<PaginationInterface<BankAccountPagination>>(url, {
      params, headers
    }).pipe(
      retry(
        {
          count: 3,
          delay: 1200
        }
      ),
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

}
