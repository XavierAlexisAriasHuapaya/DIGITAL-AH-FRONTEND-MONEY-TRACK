import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpenseAnnualComponent } from './income-and-expense-annual.component';

describe('IncomeAndExpenseAnnualComponent', () => {
  let component: IncomeAndExpenseAnnualComponent;
  let fixture: ComponentFixture<IncomeAndExpenseAnnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAndExpenseAnnualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndExpenseAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
