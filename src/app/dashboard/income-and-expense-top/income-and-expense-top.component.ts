import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { isPlatformBrowser } from '@angular/common';
import { PopoverFilterComponent } from '../popover-filter/popover-filter.component';

@Component({
  selector: 'app-income-and-expense-top',
  imports: [ChartModule, TranslatePipe, SkeletonModule, PopoverFilterComponent],
  templateUrl: './income-and-expense-top.component.html',
  styleUrl: './income-and-expense-top.component.css'
})
export class IncomeAndExpenseTopComponent implements OnInit {

  private _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  public loadingIncome = signal<boolean>(true);
  public loadingExpense = signal<boolean>(true);
  public dataIncome: any;
  public dataExpense: any;
  public optionsIncome: any;
  public optionsExpense: any;
  public yearIncome: number = new Date().getFullYear();
  public yearExpense: number = new Date().getFullYear();

  ngOnInit(): void {
    this.loadingExpense.set(true);
    this.loadingIncome.set(true);
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionBarIncomeExpenseByUserIdAndType('INCOME');
      this.getTransactionBarIncomeExpenseByUserIdAndType('EXPENSE');
    }
  }

  onDateChangeIncome(date: Date) {
    this.yearIncome = date.getFullYear();
    this.getTransactionBarIncomeExpenseByUserIdAndType('INCOME');
  }

  onDateChangeExpense(date: Date) {
    this.yearExpense = date.getFullYear();
    this.getTransactionBarIncomeExpenseByUserIdAndType('EXPENSE');
  }

  private getTransactionBarIncomeExpenseByUserIdAndType(type: string, year?: string) {
    const yearParam = year ? year : (type === 'INCOME' ? this.yearIncome.toString() : this.yearExpense.toString());
    this._dashboardService.getTransactionBarIncomeExpenseByUserIdAndType(type, yearParam)
      .pipe(finalize(() => {
        if (type.includes('INCOME')) {
          this.loadingIncome.set(false);
        } else {
          this.loadingExpense.set(false);
        }
      }))
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
          this.loadingExpense.set(true);
          this.loadingIncome.set(true);
        }
      });
  }

}
