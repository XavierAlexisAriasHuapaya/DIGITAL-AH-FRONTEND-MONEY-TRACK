import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-income-and-expense-annual-line',
  imports: [ChartModule, TranslatePipe, SkeletonModule],
  templateUrl: './income-and-expense-annual-line.component.html',
  styleUrl: './income-and-expense-annual-line.component.css'
})
export class IncomeAndExpenseAnnualLineComponent implements OnInit {

  private _platformId = inject(PLATFORM_ID);
  public loadingTransactionLineByUserId = signal<boolean>(true);
  public dataMonthMoney: any;
  public optionsMonthMoney: any;

  private _dashboardService = inject(DashboardService);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionLineByUserId();
    }
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
