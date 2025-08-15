import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PopoverFilterComponent } from '../popover-filter/popover-filter.component';

@Component({
  selector: 'app-income-and-expense-annual-line',
  imports: [ChartModule, TranslatePipe, SkeletonModule, PopoverFilterComponent],
  templateUrl: './income-and-expense-annual-line.component.html',
  styleUrl: './income-and-expense-annual-line.component.css'
})
export class IncomeAndExpenseAnnualLineComponent implements OnInit {

  private _platformId = inject(PLATFORM_ID);
  public loadingTransactionLineByUserId = signal<boolean>(true);
  public dataMonthMoney: any;
  public optionsMonthMoney: any;
  public year: number = new Date().getFullYear();

  private _dashboardService = inject(DashboardService);

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionLineByUserId();
    }
  }

  onDateChange(date: Date) {
    this.year = date.getFullYear();
    this.getTransactionLineByUserId();
  }

  private getTransactionLineByUserId() {
    this.loadingTransactionLineByUserId.set(true);
    this._dashboardService.getTransactionLineByUserId(this.year.toString())
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
