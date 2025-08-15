import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverFilterComponent } from './popover-filter.component';

describe('PopoverFilterComponent', () => {
  let component: PopoverFilterComponent;
  let fixture: ComponentFixture<PopoverFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
