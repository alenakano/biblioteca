import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosModule', canLoad: [AuthGuard] },
  { path: 'emprestimos', loadChildren: './emprestimo/emprestimo.module#EmprestimoModule', canLoad: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pesquisa', loadChildren: './pesquisa/pesquisa.module#PesquisaModule' },
  { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // Esse guard pode ser apenas declarados no providers do routing module.
  providers: [AuthGuard]
})
export class AppRoutingModule { }
