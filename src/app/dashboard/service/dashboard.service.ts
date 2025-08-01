import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, count, delay, map, Observable, retry, throwError } from 'rxjs';
import { TransactionBalanceInterface } from '../../transaction/interface/transaction-balance.interface';
import { TransactionBar } from '../../transaction/interface/transaction-bar.interface';
import { ChartBarData } from '../interface/chart-bar.interface';
import { TransactionIncomeExpense } from '../../transaction/interface/transaction-income-expense.interface';
import { AuthService } from '../../authentication/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly _endPoint = environments.endPoint;
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);

  getBalanceByUserId(userId: number): Observable<TransactionBalanceInterface> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/balance/${userId}`;
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

  getTransactionBarByUserId(userId: number): Observable<ChartBarData> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/dashboard/bar/${userId}`;
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
        let labels = items.map((item) => item.month.trim());
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


        const chart: ChartBarData = {
          labels: labels,
          datasets: [
            {
              label: 'Income',
              backgroundColor: backgroundIncome,
              borderColor: borderColorIncome,
              data: dataIncomeMonth
            },
            {
              label: 'Expense',
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

  getTransactionBarIncomeExpenseByUserIdAndType(userId: number, type: string): Observable<ChartBarData> {
    const headers = this._authService.getHeaderToken();
    const url = `${this._endPoint}/transaction/dashboard/bar/${userId}/type/${type}`;
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

        // let backgroundColor, borderColor;
        let backgroundColor: string[] = [];
        let borderColor: string[] = [];

        data.forEach(item => {
          backgroundColor.push(
            item.type.trim().includes('INBOUND')
              ? "rgba(34, 197, 94, 0.70)"
              : "rgba(255, 0, 0, 0.70)"
          );

          borderColor.push(
            item.type.trim().includes('INBOUND')
              ? "rgba(43, 255, 0, 0.2)"
              : "rgba(255, 0, 0, 0.2)"
          );
        });

        const chart: ChartBarData = {
          labels: labels,
          datasets: [
            {
              label: type,
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

}
