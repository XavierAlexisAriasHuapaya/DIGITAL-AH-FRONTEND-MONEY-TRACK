import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core'; 1
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private readonly _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  public totalIncome: number = 0;
  public totalExpense: number = 0
  public generalBalance: number = 0;
  public monthlyIncome: number = 0;
  public monthlyExpense: number = 0;
  public monthlyBalance: number = 0;

  dataMonth: any;
  dataIncome: any;
  dataExpense: any;
  dataMonthMoney: any;

  optionsMonth: any;
  optionsIncome: any;
  optionsExpense: any;
  optionsMonthMoney: any;

  themeEffect = effect(() => {
    this.initChart();
  })

  ngOnInit() {
    this.initChart();
  }

  private initChart() {
    if (isPlatformBrowser(this._platformId)) {
      this.getBalanceByUserId();
      this.getTransactionBarByUserId();
      this.getTransactionBarIncomeExpenseByUserIdAndType('INBOUND');
      this.getTransactionBarIncomeExpenseByUserIdAndType('OUTBOUND');
      this.getTransactionLineByUserId();
    }
  }

  private getBalanceByUserId() {
    this._dashboardService.getBalanceByUserId(1).subscribe({
      next: (response) => {
        this.totalIncome = response.amount_inbound;
        this.totalExpense = response.amount_outbound;
        this.generalBalance = response.balance;
        this.monthlyIncome = response.inbound_to_month;
        this.monthlyExpense = response.outbound_to_month;
        this.monthlyBalance = response.balance_to_month;
      }
    })
  }

  private getTransactionBarByUserId() {
    this._dashboardService.getTransactionBarByUserId(1).subscribe({
      next: (response) => {
        this.dataMonth = response;
        this.optionsMonth = {
          responsive: true,
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
        };
      }
    });
  }

  private getTransactionBarIncomeExpenseByUserIdAndType(type: string) {
    this._dashboardService.getTransactionBarIncomeExpenseByUserIdAndType(1, type).subscribe({
      next: (response) => {
        if (type.includes('INBOUND')) {
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
      }
    });
  }


  private getTransactionLineByUserId() {
    this._dashboardService.getTransactionLineByUserId(1).subscribe({
      next: (response) => {
        this.dataMonthMoney = response;
        this.optionsMonthMoney = {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.6
        };
      }
    });
  }

}
