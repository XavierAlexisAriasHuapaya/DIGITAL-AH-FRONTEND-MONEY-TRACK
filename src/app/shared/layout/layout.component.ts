import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { LanguageInterface } from '../../interface/language.interface';
import { CurrencyInterface } from '../../interface/currency.interface';
import { DrawerComponent } from "./drawer/drawer.component";
import { MenubarComponent } from "./menubar/menubar.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, DrawerComponent, MenubarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  public openDrawer = false;
  public languages: LanguageInterface[] = [];
  public languageSelected = '';
  public languageLabelSelected = '';

  public currency: CurrencyInterface[] = [];
  public currencySelected = '';
  public currencyLabelSelected = '';

  ngOnInit() {

  }
}