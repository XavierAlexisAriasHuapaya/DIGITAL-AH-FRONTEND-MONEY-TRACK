import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';
import { PaginationInterface } from '../../utils/interface/pagination.interface';
import { BankAccountPagination } from '../interface/bank-account-pagination.interface';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { BankAccountCreate } from '../interface/bank-account-create.interface';
import { BankAccountUpdate } from '../interface/bank-account-update.interface';
import { BankAccountFindAll } from '../interface/bank-account-find-all.interface';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);

  createBankAccount(bankAccount: BankAccountCreate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/bank-account`
    return this._httpClient.post<ResponseInterface>(url, bankAccount)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error)
        })
      );
  }

  updateBankAccount(bankAccount: BankAccountUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/bank-account`
    return this._httpClient.patch<ResponseInterface>(url, bankAccount)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error)
        })
      );
  }

  findOne(id: number): Observable<any> {
    const url = `${this._endPoint}/bank-account/${id}`
    return this._httpClient.get<any>(url).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getAllBankAccountsByUserId(userId: number): Observable<BankAccountFindAll[]> {
    const url = `${this._endPoint}/bank-account/user/${userId}`
    return this._httpClient.get<BankAccountFindAll[]>(url).pipe(
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

  pagination(page: number, size: number, userId: number, search: string): Observable<PaginationInterface<BankAccountPagination>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sort', 'createdAt,desc')
      .append('search', search);
    const url = `${this._endPoint}/bank-account/pagination/${userId}`
    return this._httpClient.get<PaginationInterface<BankAccountPagination>>(url, {
      params
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
