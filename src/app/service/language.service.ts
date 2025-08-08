import { computed, inject, Injectable, signal } from '@angular/core';
import { LanguageInterface } from '../interface/language.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _translateService = inject(TranslateService);
  private _currentLanguage = signal<string | ''>('en');
  private _languages: LanguageInterface[] = [
    {
      name: 'Spanish',
      code: 'es',
      image: 'assets/len-es.png'
    },
    {
      name: 'English',
      code: 'en',
      image: 'assets/len-en.jpg'
    }
  ];

  public currentLanguage = computed(() => this._currentLanguage());


  constructor() {
    this._translateService.addLangs(['en', 'es']);
    this._translateService.use('es');
  }

  getAllLanguage() {
    return this._languages;
  }
}
