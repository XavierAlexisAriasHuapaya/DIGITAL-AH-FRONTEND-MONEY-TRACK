import { Component, inject, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabel, ButtonModule, Chip, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  private router = inject(Router);

  public SignUp() {
    this.router.navigate(['/auth/register']);
  }

  public SignIn() {
    this.router.navigate(['/main']);
  }

}
