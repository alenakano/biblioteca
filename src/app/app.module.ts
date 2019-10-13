import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StoreModule } from '@ngrx/store';

import { MAT_DATE_LOCALE } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { AuthService } from './auth/auth.service';
import { CadastrosModule } from './cadastros/cadastros.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { HeaderComponent } from './navegacao/header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LivroService } from './cadastros/obras/livro/livro.service';
import { LoginComponent } from './auth/login/login.component';
import { MidiaService } from './cadastros/obras/midia/midia.service';
import { OutrasObrasService } from './cadastros/obras/outras-obras/outras-obras-service';
import { PeriodicoService } from './cadastros/obras/periodico/periodico.service';
import { PesquisaModule } from './pesquisa/pesquisa.module';
import { reducers } from './app.reducer';
import { SharedModule } from './util/shared.module';
import { SidenavListComponent } from './navegacao/sidenav-list/sidenav-list.component';
import { SituacaoService } from './emprestimo/situacao/situacao.service';
import { SubscriptionHandlerService } from './subscriptionsHandler.service';
import { UIService } from './util/ui.service';
import { UsuariosService } from './cadastros/usuarios/usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule ,
    BrowserAnimationsModule,
    BrowserModule,
    CadastrosModule,
    EmprestimoModule,
    HttpClientModule,
    PesquisaModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    AuthService,
    LivroService,
    PeriodicoService,
    MidiaService,
    OutrasObrasService,
    SituacaoService,
    SubscriptionHandlerService,
    UsuariosService,
    UIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
