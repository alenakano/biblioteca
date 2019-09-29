import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';

import { PesquisaComponent } from './pesquisa.component';

const routes: Routes = [
  // o path cadastro está protegido pela classe authguard. Somente logados podem ver
  { path: '', component: PesquisaComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class PesquisaRoutingModule {}
