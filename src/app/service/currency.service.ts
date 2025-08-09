import { Injectable } from '@angular/core';
import { CurrencyInterface } from '../interface/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _currency: CurrencyInterface[] = [
    {
      code: 'PEN',
      currency: 'Sol Peruano',
      symbol: 'S/',
      country: 'Perú',
      locale: 'es-PE'
    },
    {
      code: 'USD',
      currency: 'Dólar estadounidense',
      symbol: '$',
      country: 'EE.UU',
      locale: 'en-US'
    },
    {
      code: 'ARS',
      currency: 'Peso argentino',
      symbol: '$',
      country: 'Argentina',
      locale: 'es-AR'
    },
    {
      code: 'CLP',
      currency: 'Peso chileno',
      symbol: '$',
      country: 'Chile',
      locale: 'es-CL'
    },
    {
      code: 'COP',
      currency: 'Peso colombiano',
      symbol: '$',
      country: 'Colombia',
      locale: 'es-CO'
    },
    {
      code: 'UYU',
      currency: 'Peso uruguayo',
      symbol: '$U',
      country: 'Uruguay',
      locale: 'es-UY'
    }
  ];

  getAllCurrency() {
    return this._currency;
  }

}
