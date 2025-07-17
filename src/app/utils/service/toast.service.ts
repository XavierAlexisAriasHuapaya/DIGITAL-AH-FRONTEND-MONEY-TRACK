import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastPositionType } from 'primeng/toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _messageService = inject(MessageService);
  private _position = new BehaviorSubject<ToastPositionType>('center');
  position = this._position.asObservable();


  setPosition(position: ToastPositionType) {
    this._position.next(position);
  }

  showToast(severity: string, message: string, position: ToastPositionType) {
    this.setPosition(position);
    this._messageService.add({ severity: severity, summary: 'Message', detail: message });
  }
}
