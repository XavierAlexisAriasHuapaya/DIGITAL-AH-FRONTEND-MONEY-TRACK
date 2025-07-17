import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../utils/service/toast.service';
import { CountryInterface } from '../interface/country.interface';
import { CountryService } from '../service/country.service';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../service/user.service';
import { UserUpdate } from '../interface/user-update.interface';

@Component({
  selector: 'app-user-form',
  imports: [ButtonModule, InputTextModule, FloatLabel, SelectModule, ReactiveFormsModule, PasswordModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  private _dynamicDialogRef = inject(DynamicDialogRef);
  private _formBuilder = inject(FormBuilder);
  private readonly _toastService = inject(ToastService);
  private readonly _countryService = inject(CountryService);
  private readonly _userService = inject(UserService);

  public id: number = 1;
  public countryData: CountryInterface[] = [];
  public myForm = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    country: this._formBuilder.group({
      id: [1, [Validators.required]],
      name: ['', [Validators.required]],
      cca2: [''],
      cca3: [''],
      currencySymbol: [''],
      currencyName: [''],
      codeCountry: ['']
    })
  });


  ngOnInit(): void {
    this.findAllCountry();
    this._userService.findById(this.id).subscribe({
      next: (response) => {
        this.myForm.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          country: response.country
        })
      }, error: (error) => {
        this._toastService.showToast('error', error, 'bottom-center');
      }
    })
  }

  private findAllCountry() {
    this._countryService.getAll().subscribe({
      next: (response) => {
        this.countryData = response;
      }, error: (error) => {
        this._toastService.showToast('error', error, 'bottom-center');
      }
    })
  }

  close() {
    this._dynamicDialogRef.close();
  }

  update() {
    const user: UserUpdate = {
      id: this.id,
      firstName: this.myForm.get('firstName')?.value ?? '',
      lastName: this.myForm.get('lastName')?.value ?? '',
      country: {
        id: this.myForm.get('country')?.get('id')?.value ?? 1,
      }
    };
    this._userService.update(user).subscribe({
      next: (response) => {
        this._toastService.showToast('success', response.response, 'bottom-center');
        this.close();
      },
      error: (error) => {
        this._toastService.showToast('error', error, 'bottom-center');
      },
    })
  }

}
