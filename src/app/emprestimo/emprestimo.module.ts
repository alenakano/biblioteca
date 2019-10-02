import { NgModule } from '@angular/core';

import { CommonModule } from '../common/common.module';
import { DevolverComponent } from './devolver/devolver.component';
import { EmprestarComponent } from './emprestar/emprestar.component';
import { EmprestimoComponent } from './emprestimo.component';
import { EmprestimoRoutingModule } from './emprestimo-routing.module'
import { SituacaoComponent } from './situacao/situacao.component';
import { SharedModule } from '../util/shared.module';

@NgModule({
  declarations: [
    DevolverComponent,
    EmprestarComponent,
    EmprestimoComponent,
    SituacaoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    EmprestimoRoutingModule,
  ],
  exports: [
    DevolverComponent,
    EmprestarComponent,
    EmprestimoComponent,
    SituacaoComponent,
  ],
})
export class EmprestimoModule {}
