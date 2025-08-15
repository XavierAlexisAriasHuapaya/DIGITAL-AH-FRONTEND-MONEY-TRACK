import { Component, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-popover-filter',
  imports: [PopoverModule, DatePickerModule, FormsModule, TranslateModule],
  templateUrl: './popover-filter.component.html',
  styleUrl: './popover-filter.component.css'
})
export class PopoverFilterComponent {

  @ViewChild('op') op!: Popover;

  @Output() dateFilter = new EventEmitter<Date>;

  public openPopeverFilter(event: Event) {
    this.op.toggle(event);
  }

  public changeYear(event: any) {
    this.dateFilter.emit(event);
  }
}
