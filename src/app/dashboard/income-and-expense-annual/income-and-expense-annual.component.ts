import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-income-and-expense-annual',
  imports: [ChartModule, TranslatePipe, SkeletonModule],
  templateUrl: './income-and-expense-annual.component.html',
  styleUrl: './income-and-expense-annual.component.css'
})
export class IncomeAndExpenseAnnualComponent implements OnInit {

  private _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  public loadingTransactionBarByUserId = signal<boolean>(true);
  public dataMonth: any;
  public optionsMonth: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionBarByUserId();
    }
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

}
