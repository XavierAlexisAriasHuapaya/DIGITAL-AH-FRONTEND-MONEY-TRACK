import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastService } from './utils/service/toast.service';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { AuthService } from './authentication/service/auth.service';
import { AuthenticationStatus } from './authentication/enum/authentication-status.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  public toastPosition: ToastPositionType = 'center';

  constructor() {
    this._toastService.position.subscribe(position => {
      this.toastPosition = position;
    })
  }

  public finishedAuthCheck = computed(() => {
    return this._authService.currentAuthStatus() == AuthenticationStatus.checking ? false : true;
  })

  public authStatusChangedEffect = effect(() => {
    switch (this._authService.currentAuthStatus()) {
      case AuthenticationStatus.checking:
        return;
      case AuthenticationStatus.notAuthenticated:
        this._router.navigateByUrl("/auth/login");
        return;
      case AuthenticationStatus.authenticated:
        this._router.navigateByUrl("/main")
    }
  })

}
