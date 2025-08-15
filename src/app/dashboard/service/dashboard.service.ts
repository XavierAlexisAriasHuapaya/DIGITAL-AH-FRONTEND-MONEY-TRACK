import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { TransactionBalanceInterface } from '../../transaction/interface/transaction-balance.interface';
import { TransactionBar } from '../../transaction/interface/transaction-bar.interface';
import { ChartBarData } from '../interface/chart-bar.interface';
import { TransactionIncomeExpense } from '../../transaction/interface/transaction-income-expense.interface';
import { AuthService } from '../../authentication/service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);
  private _translateService = inject(TranslateService);

  getBalanceByUserId(): Observable<TransactionBalanceInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/balance/${this._authService.currentUserId()}`;
    return this._httpClient.get<TransactionBalanceInterface>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getTransactionBarByUserId(year: string): Observable<ChartBarData> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/dashboard/bar/${this._authService.currentUserId()}/year/${year}`;
    return this._httpClient.get<TransactionBar[]>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
      map((data) => {
        const items = Array.isArray(data) ? data : [data];
        let labels = items.map((item) => this._translateService.instant(item.month.trim()));
        labels = [...new Set(labels)];

        let dataIncomeMonth = items.map((item) => item.income);
        dataIncomeMonth = [...dataIncomeMonth];
        let dataExpenseMonth = items.map((item) => item.expense);
        dataExpenseMonth = [...dataExpenseMonth];

        let backgroundIncome = items.map((item) => item.backgroundColorIncome)
        backgroundIncome = [...backgroundIncome];
        let borderColorIncome = items.map((item) => item.borderColorIncome);
        borderColorIncome = [...borderColorIncome];

        let backgroundExpense = items.map((item) => item.backgroundColorExpense)
        backgroundExpense = [...backgroundExpense];
        let borderColorExpense = items.map((item) => item.borderColorExpense);
        borderColorExpense = [...borderColorExpense];

        const backgroundColor = this.getUniquePrimaryColors(0.7, items.length);
        const borderColor = backgroundColor;

        const chart: ChartBarData = {
          labels: labels,
          datasets: [
            {
              label: this._translateService.instant('Income'),
              backgroundColor: backgroundIncome,
              borderColor: borderColorIncome,
              data: dataIncomeMonth
            },
            {
              label: this._translateService.instant('Expense'),
              backgroundColor: backgroundExpense,
              borderColor: borderColorExpense,
              data: dataExpenseMonth
            }
          ]
        }
        return chart;
      })
    )
  }

  private getUniquePrimaryColors(alpha: number = 0.7, count: number): string[] {
    const primaryColors = [
      `rgba(255, 99, 132, ${alpha})`,   // Rojo suave
      `rgba(54, 162, 235, ${alpha})`,   // Azul suave
      `rgba(255, 206, 86, ${alpha})`,   // Amarillo suave
      `rgba(75, 192, 192, ${alpha})`,   // Verde agua suave
      `rgba(153, 102, 255, ${alpha})`,  // Morado suave
      `rgba(255, 159, 64, ${alpha})`    // Naranja suave
    ];

    // Barajar los colores para que no salgan siempre en el mismo orden
    const shuffled = [...primaryColors].sort(() => Math.random() - 0.5);

    // Si hay más barras que colores, repetimos el ciclo sin que se repitan seguidas
    const result: string[] = [];
    while (result.length < count) {
      result.push(...shuffled);
    }

    return result.slice(0, count);
  }

  getTransactionBarIncomeExpenseByUserIdAndType(type: string, year: string): Observable<ChartBarData> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/dashboard/bar/${this._authService.currentUserId()}/type/${type}/year/${year}`;
    return this._httpClient.get<TransactionIncomeExpense[]>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      map((data) => {
        const items = Array.isArray(data) ? data : [data];

        let labels = items.map((item => item.description));
        labels = [...labels];
        let amount = items.map((item => item.amount));
        amount = [...amount];

        const backgroundColor = this.getUniquePrimaryColors(0.7, items.length);
        const borderColor = backgroundColor;

        const typeFormatted = type.charAt(0) + type.slice(1).toLowerCase();

        const chart: ChartBarData = {
          labels: labels,
          datasets: [
            {
              label: this._translateService.instant(typeFormatted),
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: amount
            }
          ]
        };
        return chart;
      })
    )
  }

  getTransactionLineByUserId(year: string): Observable<ChartBarData> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/dashboard/bar/${this._authService.currentUserId()}/year/${year}`;
    return this._httpClient.get<TransactionBar[]>(url, { headers }).pipe(
      retry({
        count: 3,
        delay: 1200
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
      map((data) => {
        const items = Array.isArray(data) ? data : [data];
        let labels = items.map((item) => this._translateService.instant(item.month.trim()));
        labels = [...new Set(labels)];

        let dataIncomeMonth = items.map((item) => item.income);
        dataIncomeMonth = [...dataIncomeMonth];
        let dataExpenseMonth = items.map((item) => item.expense);
        dataExpenseMonth = [...dataExpenseMonth];

        let backgroundIncome = items.map((item) => item.backgroundColorIncome)
        backgroundIncome = [...backgroundIncome];
        let borderColorIncome = items.map((item) => item.borderColorIncome);
        borderColorIncome = [...borderColorIncome];

        let backgroundExpense = items.map((item) => item.backgroundColorExpense)
        backgroundExpense = [...backgroundExpense];
        let borderColorExpense = items.map((item) => item.borderColorExpense);
        borderColorExpense = [...borderColorExpense];

        const backgroundColor = this.getUniquePrimaryColors(0.7, items.length);
        const borderColor = backgroundColor;

        const chart: ChartBarData = {
          labels: labels,
          datasets: [
            {
              label: this._translateService.instant('Income'),
              backgroundColor: backgroundIncome,
              fill: false,
              borderColor: borderColorIncome,
              yAxisID: 'y',
              tension: 0.4,
              data: dataIncomeMonth
            },
            {
              label: this._translateService.instant('Expense'),
              backgroundColor: backgroundExpense,
              fill: false,
              borderColor: borderColorExpense,
              yAxisID: 'y',
              tension: 0.4,
              data: dataExpenseMonth
            }
          ]
        }
        return chart;
      })
    )
  }

}
