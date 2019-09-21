import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmprestimoComponent } from './emprestimo/emprestimo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { NovaComponent } from './pesquisa/nova/nova.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { SignupComponent } from './auth/signup/signup.component';

import { MAT_DATE_LOCALE } from '@angular/material';
import { ValidaCpf } from './auth/signup/validaCPF.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PesquisaComponent,
    NovaComponent,
    EmprestimoComponent,
    HomeComponent,
    ValidaCpf,
  ],
  imports: [
    AppRoutingModule ,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
