import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DashboardService } from '../service/dashboard.service';
import { finalize } from 'rxjs';
import { PopoverModule } from 'primeng/popover';
import { isPlatformBrowser } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { PopoverFilterComponent } from '../popover-filter/popover-filter.component';

@Component({
  selector: 'app-income-and-expense-annual',
  imports: [ChartModule, TranslatePipe, SkeletonModule, PopoverModule, DatePickerModule, FormsModule, PopoverFilterComponent],
  templateUrl: './income-and-expense-annual.component.html',
  styleUrl: './income-and-expense-annual.component.css'
})
export class IncomeAndExpenseAnnualComponent implements OnInit {

  private _dashboardService = inject(DashboardService);
  private _platformId = inject(PLATFORM_ID);

  public loadingTransactionBarByUserId = signal<boolean>(true);
  public dataMonth: any;
  public optionsMonth: any;
  public year: number = new Date().getFullYear();

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.getTransactionBarByUserId();
    }
  }

  onDateChange(date: Date) {
    this.year = date.getFullYear();
    this.getTransactionBarByUserId();
  }

  private getTransactionBarByUserId() {
    this.loadingTransactionBarByUserId.set(true);
    this._dashboardService.getTransactionBarByUserId(this.year.toString())
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
