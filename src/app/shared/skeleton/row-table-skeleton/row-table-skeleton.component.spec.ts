import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTableSkeletonComponent } from './row-table-skeleton.component';

describe('RowTableSkeletonComponent', () => {
  let component: RowTableSkeletonComponent;
  let fixture: ComponentFixture<RowTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowTableSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowTableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
