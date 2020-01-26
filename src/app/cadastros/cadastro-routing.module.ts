import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrosComponent } from './cadastros.component';

const routes: Routes = [
  // o path cadastro está protegido pela classe authguard. Somente logados podem ver
    { path: '', component: CadastrosComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class CadastroRoutingModule {}