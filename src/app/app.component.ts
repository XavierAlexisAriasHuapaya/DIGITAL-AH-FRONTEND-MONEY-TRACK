import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastService } from './utils/service/toast.service';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { AuthService } from './authentication/service/auth.service';
import { AuthenticationStatus } from './authentication/enum/authentication-status.enum';
import { Location } from '@angular/common';

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
  private _location = inject(Location);

  constructor() {
    this._toastService.position.subscribe(position => {
      this.toastPosition = position;
    })
  }

  public finishedAuthCheck = computed(() => {
    return this._authService.currentAuthStatus() == AuthenticationStatus.checking ? false : true;
  })

  public authStatusChangedEffect = effect(() => {
    const path = this._location.path();
    const token = path.includes('?token=') ? path.split('=')[1] : undefined;

    switch (this._authService.currentAuthStatus()) {
      case AuthenticationStatus.checking:
        return;
      case AuthenticationStatus.notAuthenticated:

        if (token && !localStorage.getItem('token')) {
          localStorage.setItem('token', token);
          this._authService.checkAuthStatus().subscribe(isValid => {
            if (isValid) {
              this._router.navigateByUrl("/main");
            } else {
              localStorage.removeItem('token');
              this._router.navigateByUrl("/auth/login");
            }
          });
        } else {
          localStorage.removeItem('token');
          this._router.navigateByUrl("/auth/login");
        }

        return;
      case AuthenticationStatus.authenticated:
        this._router.navigateByUrl("/main")
    }
  })

}
