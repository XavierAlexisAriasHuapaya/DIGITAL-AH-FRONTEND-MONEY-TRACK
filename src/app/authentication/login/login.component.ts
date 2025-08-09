import { Component, inject, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../service/auth.service';
import { UserAuthenticationRequest } from '../interface/user-authentication-request.interface';
import { ToastService } from '../../utils/service/toast.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, ButtonModule, Chip, PasswordModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);

  public myForm = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  public formUtils = FormUtils;

  public SignUp() {
    this._router.navigate(['/auth/register']);
  }

  public SignIn() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const request: UserAuthenticationRequest = {
      username: this.myForm.value.username ?? '',
      password: this.myForm.value.password ?? ''
    };
    this._authService.login(request).subscribe({
      error: (error) => {
        this._toastService.showToast('error', error.message, 'bottom-center');
      }
    })
  }

  public SignInGoogle() {
    this._authService.loginGoogle();
  }

}
