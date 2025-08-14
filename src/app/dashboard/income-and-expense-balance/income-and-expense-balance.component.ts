import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService } from '../../authentication/service/auth.service';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-income-and-expense-balance',
  imports: [ChartModule, CurrencyPipe, TranslatePipe, SkeletonModule],
  templateUrl: './income-and-expense-balance.component.html',
  styleUrl: './income-and-expense-balance.component.css'
})
export class IncomeAndExpenseBalanceComponent implements OnInit {

  public totalIncome: number = 0;
  public totalExpense: number = 0
  public generalBalance: number = 0;
  public monthlyIncome: number = 0;
  public monthlyExpense: number = 0;
  public monthlyBalance: number = 0;
  public authService = inject(AuthService);
  public loadingBalanceByUserId = signal<boolean>(true);

  private _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getBalanceByUserId();
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

}
