import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpenseAnnualLineComponent } from './income-and-expense-annual-line.component';

describe('IncomeAndExpenseAnnualLineComponent', () => {
  let component: IncomeAndExpenseAnnualLineComponent;
  let fixture: ComponentFixture<IncomeAndExpenseAnnualLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAndExpenseAnnualLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndExpenseAnnualLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
