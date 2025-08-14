import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-income-and-expense-top',
  imports: [ChartModule, TranslatePipe, SkeletonModule],
  templateUrl: './income-and-expense-top.component.html',
  styleUrl: './income-and-expense-top.component.css'
})
export class IncomeAndExpenseTopComponent implements OnInit {

  private _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  public loadingTransactionBarIncomeExpenseByUserIdAndType = signal<boolean>(true);
  public dataIncome: any;
  public dataExpense: any;
  public optionsIncome: any;
  public optionsExpense: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionBarIncomeExpenseByUserIdAndType('INCOME');
      this.getTransactionBarIncomeExpenseByUserIdAndType('EXPENSE');
    }
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

}
