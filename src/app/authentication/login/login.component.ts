import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../service/auth.service';
import { UserAuthenticationRequest } from '../interface/user-authentication-request.interface';
import { ToastService } from '../../utils/service/toast.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, ButtonModule, Chip, PasswordModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);

  public myForm = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  public formUtils = FormUtils;

  ngOnInit(): void {
    // this._activatedRoute.queryParams.subscribe(params => {
    //   const token = params['token'];

    //   if (token) {
    //     // Guardar antes que nada
    //     localStorage.setItem('token', token);

    //     // Validar sesión
    //     this._authService.checkAuthStatus().subscribe(isValid => {
    //       if (isValid) {
    //         this._router.navigate(['/main']);
    //       } else {
    //         this._router.navigate(['/auth/login']);
    //       }
    //     });

    //   } else {
    //     // Solo si NO viene token, entonces hago validación normal
    //     this._authService.checkAuthStatus().subscribe(isValid => {
    //       if (isValid) {
    //         this._router.navigate(['/main']);
    //       }
    //     });
    //   }
    // });
  }

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
        console.log(error);
        this._toastService.showToast('error', error.message, 'bottom-center');
      }
    })
  }

  public SignInGoogle() {
    this._authService.loginGoogle();
  }

}
