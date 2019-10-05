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

import { reducers } from './app.reducer';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './navegacao/header/header.component';
import { HomeComponent } from './home/home.component';
import { LivroService } from './cadastros/obras/livro/livro.service';
import { LoginComponent } from './auth/login/login.component';
import { SidenavListComponent } from './navegacao/sidenav-list/sidenav-list.component';
import { ValidaCpfDirective} from './util/validaCPF.directive';
import { SubscriptionHandlerService } from './subscriptionsHandler.service';
import { UIService } from './util/ui.service';
import { CadastrosModule } from './cadastros/cadastros.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { PeriodicoService } from './cadastros/obras/periodico/periodico.service';
import { PesquisaModule } from './pesquisa/pesquisa.module';
import { SharedModule } from './util/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent,
    ValidaCpfDirective,
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
    SubscriptionHandlerService,
    UIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
