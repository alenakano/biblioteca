import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosComponent } from './relatorios.component';

const routes: Routes = [
  // o path cadastro está protegido pela classe authguard. Somente logados podem ver
  { path: '', component: RelatoriosComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class RelatoriosRoutingModule {}
