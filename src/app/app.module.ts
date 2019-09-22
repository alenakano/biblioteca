import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

/**ReactiveFormsModule utilizado para capturar valor de select do angular material em forms
 * Vide outras-opcoes-component
 */
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { AuthService } from './auth/auth.service';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';
import { HeaderComponent } from './navegacao/header/header.component';
import { HomeComponent } from './home/home.component';
import { LivroComponent } from './cadastros/obras/livro/livro.component';
import { LivroService } from './cadastros/obras/livro/livro.service';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { MidiaComponent } from './cadastros/obras/midia/midia.component';
import { NovaComponent } from './pesquisa/nova/nova.component';
import { ObrasComponent } from './cadastros/obras/obras.component';
import { ObrasOpcoesComponent } from './cadastros/obras/obras-opcoes/obras-opcoes.component';
import { OutrasObrasComponent } from './cadastros/obras/outras-obras/outras-obras.component';
import { PeriodicoComponent } from './cadastros/obras/periodico/periodico.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { SidenavListComponent } from './navegacao/sidenav-list/sidenav-list.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ValidaCpfDirective} from './cadastros/usuarios/validaCPF.directive';
import { ResultadosComponent } from './pesquisa/resultados/resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrosComponent,
    EmprestimoComponent,
    LoginComponent,
    LivroComponent,
    HeaderComponent,
    HomeComponent,
    ObrasComponent,
    MidiaComponent,
    NovaComponent,
    ObrasOpcoesComponent,
    OutrasObrasComponent,
    PeriodicoComponent,
    PesquisaComponent,
    SidenavListComponent,
    UsuariosComponent,
    ValidaCpfDirective,
    ResultadosComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule ,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    AuthService,
    LivroService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
