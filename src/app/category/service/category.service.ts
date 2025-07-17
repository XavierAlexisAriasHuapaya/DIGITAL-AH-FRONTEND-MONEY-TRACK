import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { PaginationInterface } from '../../utils/interface/pagination.interface';
import { CategoryPagination } from '../interface/category-pagination.interface';
import { CategoryCreate } from '../interface/category-create.interface';
import { ResponseInterface } from '../../utils/interface/response.interface';
import { CategoryFindOne } from '../interface/category-find-one.interface';
import { CategoryUpdate } from '../interface/category-update.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _httpCliente = inject(HttpClient);
  private _endPoint = environments.endPoint;

  paginationCategories(page: number, size: number, userId: number, search?: string): Observable<PaginationInterface<CategoryPagination>> {
    const url = `${this._endPoint}/category/pagination/${userId}`
    const params = new HttpParams()
      .append('page', page)
      .append('size', size)
      .append('sort', 'createdAt,desc')
      .append('search', search ?? '');
    return this._httpCliente.get<PaginationInterface<CategoryPagination>>(url, { params }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  findByIdCategory(id: number): Observable<CategoryFindOne> {
    const url = `${this._endPoint}/category/${id}`
    return this._httpCliente.get<CategoryFindOne>(url).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  createCategory(category: CategoryCreate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/category`
    return this._httpCliente.post<ResponseInterface>(url, category)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error);
        })
      );
  }

  updateCategory(category: CategoryUpdate): Observable<ResponseInterface> {
    const url = `${this._endPoint}/category`
    return this._httpCliente.patch<ResponseInterface>(url, category)
      .pipe(
        catchError((error) => {
          return throwError(() => error.error)
        })
      );
  }

}
