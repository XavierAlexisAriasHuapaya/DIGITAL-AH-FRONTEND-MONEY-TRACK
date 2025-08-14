import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpenseBalanceComponent } from './income-and-expense-balance.component';

describe('IncomeAndExpenseBalanceComponent', () => {
  let component: IncomeAndExpenseBalanceComponent;
  let fixture: ComponentFixture<IncomeAndExpenseBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAndExpenseBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndExpenseBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
