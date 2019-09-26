import { NgModule } from '@angular/core';

import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { DevolverComponent } from './devolver/devolver.component';
import { EmprestarComponent } from './emprestar/emprestar.component';
import { EmprestimoComponent } from './emprestimo.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { SharedModule } from '../util/shared.module';

@NgModule({
  declarations: [
    ConfirmacaoComponent,
    DevolverComponent,
    EmprestarComponent,
    EmprestimoComponent,
    SituacaoComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ConfirmacaoComponent,
    DevolverComponent,
    EmprestarComponent,
    EmprestimoComponent,
    SituacaoComponent,
  ],
})
export class EmprestimoModule {}
