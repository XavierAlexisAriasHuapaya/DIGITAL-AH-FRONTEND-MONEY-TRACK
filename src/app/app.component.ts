import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './utils/service/toast.service';
import { ToastModule, ToastPositionType } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private _toastService = inject(ToastService);
  public toastPosition: ToastPositionType = 'center';

  constructor() {
    this._toastService.position.subscribe(position => {
      this.toastPosition = position;
    })
  }

}
