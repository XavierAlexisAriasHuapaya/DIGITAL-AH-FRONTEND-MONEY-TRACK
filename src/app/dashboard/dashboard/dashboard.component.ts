import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../service/dashboard.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../authentication/service/auth.service';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, CurrencyPipe, TranslatePipe, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private readonly _dashboardService = inject(DashboardService);
  public authService = inject(AuthService);
  private _platformId = inject(PLATFORM_ID);

  public totalIncome: number = 0;
  public totalExpense: number = 0
  public generalBalance: number = 0;
  public monthlyIncome: number = 0;
  public monthlyExpense: number = 0;
  public monthlyBalance: number = 0;
  public loadingBalanceByUserId = signal<boolean>(true);
  public loadingTransactionBarByUserId = signal<boolean>(true);
  public loadingTransactionBarIncomeExpenseByUserIdAndType = signal<boolean>(true);
  public loadingTransactionLineByUserId = signal<boolean>(true);

  dataMonth: any;
  dataIncome: any;
  dataExpense: any;
  dataMonthMoney: any;

  optionsMonth: any;
  optionsIncome: any;
  optionsExpense: any;
  optionsMonthMoney: any;

  ngOnInit() {
    this.loadingBalanceByUserId.set(true);
    this.loadingTransactionBarByUserId.set(true);
    this.loadingTransactionBarIncomeExpenseByUserIdAndType.set(true);
    this.loadingTransactionLineByUserId.set(true);
    this.initChart();
  }

  private initChart() {
    if (isPlatformBrowser(this._platformId)) {
      this.getBalanceByUserId();
      this.getTransactionBarByUserId();
      this.getTransactionBarIncomeExpenseByUserIdAndType('INCOME');
      this.getTransactionBarIncomeExpenseByUserIdAndType('EXPENSE');
      this.getTransactionLineByUserId();
    }
  }

  private getBalanceByUserId() {
    this.loadingBalanceByUserId.set(true);
    this._dashboardService.getBalanceByUserId()
      .pipe(finalize(() => this.loadingBalanceByUserId.set(false)))
      .subscribe({
        next: (response) => {
          this.totalIncome = response.amount_inbound;
          this.totalExpense = response.amount_outbound;
          this.generalBalance = response.balance;
          this.monthlyIncome = response.inbound_to_month;
          this.monthlyExpense = response.outbound_to_month;
          this.monthlyBalance = response.balance_to_month;
        },
        error: () => {
          this.loadingBalanceByUserId.set(true);
        }
      })
  }

  private getTransactionBarByUserId() {
    this.loadingTransactionBarByUserId.set(true);
    this._dashboardService.getTransactionBarByUserId()
      .pipe(finalize(() => this.loadingTransactionBarByUserId.set(false)))
      .subscribe({
        next: (response) => {
          this.dataMonth = response;
          this.optionsMonth = {
            responsive: true,
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
          };
        },
        error: () => {
          this.loadingTransactionBarByUserId.set(true);
        }
      });
  }

  private getTransactionBarIncomeExpenseByUserIdAndType(type: string) {
    this.loadingTransactionBarIncomeExpenseByUserIdAndType.set(true);
    this._dashboardService.getTransactionBarIncomeExpenseByUserIdAndType(type)
      .pipe(finalize(() => this.loadingTransactionBarIncomeExpenseByUserIdAndType.set(false)))
      .subscribe({
        next: (response) => {
          if (type.includes('INCOME')) {
            this.dataIncome = response;
            this.optionsIncome = {
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 0.8,
            };
          } else {
            this.dataExpense = response;
            this.optionsExpense = {
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 0.8,
            };
          }
        },
        error: () => {
          this.loadingTransactionBarIncomeExpenseByUserIdAndType.set(true);
        }
      });
  }


  private getTransactionLineByUserId() {
    this.loadingTransactionLineByUserId.set(true);
    this._dashboardService.getTransactionLineByUserId()
      .pipe(finalize(() => this.loadingTransactionLineByUserId.set(false)))
      .subscribe({
        next: (response) => {
          this.dataMonthMoney = response;
          this.optionsMonthMoney = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.6
          };
        },
        error: () => {
          this.loadingTransactionLineByUserId.set(true);
        }
      });
  }

}
