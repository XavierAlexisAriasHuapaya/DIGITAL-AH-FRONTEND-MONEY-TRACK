import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-row-table-skeleton',
  imports: [SkeletonModule],
  templateUrl: './row-table-skeleton.component.html',
  styleUrl: './row-table-skeleton.component.css'
})
export class RowTableSkeletonComponent {

  @Input() rows: number = 0;
  @Input() columns: number = 0;

  get rowsArray(): number[] {
    return Array(this.rows).fill(0);
  }

  get columnsArray(): number[] {
    return Array(this.columns).fill(0);
  }

}
