import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { CadastrosComponent } from './cadastros/cadastros.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastros', component: CadastrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pesquisa', component: PesquisaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
