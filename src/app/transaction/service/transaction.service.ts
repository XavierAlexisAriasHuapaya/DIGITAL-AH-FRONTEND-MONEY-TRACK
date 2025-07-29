import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PaginationInterface } from '../../utils/interface/pagination.interface';
import { TransactionPagination } from '../interface/transaction-pagination.interface';
import { TransactionCreate } from '../interface/transaction-create.interface';
import { ResponseInterface } from '../../utils/interface/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);

  pagination(page: number, size: number, search: string): Observable<PaginationInterface<TransactionPagination>> {
    const userId = 1;
    const url = `${this._endPoint}/transaction/pagination/${userId}`;
    const params = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sort', 'date,desc')
      .append('search', search);
    return this._httpClient.get<PaginationInterface<TransactionPagination>>(url, { params })
      .pipe(
        retry({
          count: 3,
          delay: 1200
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
  }

  createTransaction(transaction: TransactionCreate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/transaction`;
    return this._httpClient.post<ResponseInterface>(url, transaction)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error);
        })
      );
  }

}
