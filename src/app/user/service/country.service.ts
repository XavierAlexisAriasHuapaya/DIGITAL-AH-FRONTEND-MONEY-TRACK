import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from '../interface/country.interface';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);

  getAll(): Observable<CountryInterface[]> {
    const url = `${this._endPoint}/country`;
    return this._httpClient.get<CountryInterface[]>(url).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  findById(id: number): Observable<CountryInterface> {
    const url = `${this._endPoint}/api/country/${id}`;
    return this._httpClient.get<CountryInterface>(url).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
