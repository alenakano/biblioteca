import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrosComponent } from './cadastros/cadastros.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';

import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  // o path cadastro está protegido pela classe authguard. Somente logados podem ver
  { path: 'cadastros', component: CadastrosComponent, canActivate: [AuthGuard] },
  { path: 'emprestimos', component: EmprestimoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pesquisa', component: PesquisaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // Esse guard pode ser apenas declarados no providers do routing module.
  providers: [AuthGuard]
})
export class AppRoutingModule { }
