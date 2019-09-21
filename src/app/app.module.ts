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
import { CadastrosComponent } from './cadastros/cadastros.component';

import { MAT_DATE_LOCALE } from '@angular/material';
import { ValidaCpfDirective} from './cadastros/usuarios/validaCPF.directive';
import { HeaderComponent } from './navegacao/header/header.component';
import { SidenavListComponent } from './navegacao/sidenav-list/sidenav-list.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrosComponent,
    LoginComponent,
    PesquisaComponent,
    NovaComponent,
    EmprestimoComponent,
    HomeComponent,
    ValidaCpfDirective,
    HeaderComponent,
    SidenavListComponent,
    UsuariosComponent,
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
