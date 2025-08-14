import { Component } from '@angular/core';
import { IncomeAndExpenseBalanceComponent } from '../income-and-expense-balance/income-and-expense-balance.component';
import { IncomeAndExpenseAnnualComponent } from '../income-and-expense-annual/income-and-expense-annual.component';
import { IncomeAndExpenseTopComponent } from '../income-and-expense-top/income-and-expense-top.component';
import { IncomeAndExpenseAnnualLineComponent } from '../income-and-expense-annual-line/income-and-expense-annual-line.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    IncomeAndExpenseBalanceComponent,
    IncomeAndExpenseAnnualComponent,
    IncomeAndExpenseTopComponent,
    IncomeAndExpenseAnnualLineComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
