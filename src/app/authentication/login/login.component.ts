import { Component, inject, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../service/auth.service';
import { UserAuthenticationRequest } from '../interface/user-authentication-request.interface';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, ButtonModule, Chip, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  private _router = inject(Router);
  private _authService = inject(AuthService);


  public SignUp() {
    this._router.navigate(['/auth/register']);
  }

  public SignIn() {
    const request: UserAuthenticationRequest = {
      username: 'alexis',
      password: 'clave123'
    };
    this._authService.login(request).subscribe({
      next: (data) => {

      },
      error: (error) => {

      }
    })
  }

}
