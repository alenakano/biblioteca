import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { DevolverComponent } from './devolver/devolver.component';
import { EmprestarComponent } from './emprestar/emprestar.component';
import { EmprestimoComponent } from './emprestimo.component';
import { SituacaoComponent } from './situacao/situacao.component';

@NgModule({
  declarations: [
    ConfirmacaoComponent,
    DevolverComponent,
    EmprestarComponent,
    EmprestimoComponent,
    SituacaoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
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
