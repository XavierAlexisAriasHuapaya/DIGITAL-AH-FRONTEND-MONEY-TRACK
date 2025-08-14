import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpenseTopComponent } from './income-and-expense-top.component';

describe('IncomeAndExpenseTopComponent', () => {
  let component: IncomeAndExpenseTopComponent;
  let fixture: ComponentFixture<IncomeAndExpenseTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAndExpenseTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndExpenseTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
