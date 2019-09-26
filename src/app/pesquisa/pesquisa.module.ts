import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { NovaComponent } from './nova/nova.component';
import { PesquisaComponent } from './pesquisa.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [
    NovaComponent,
    PesquisaComponent,
    ResultadosComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NovaComponent,
    PesquisaComponent,
    ResultadosComponent,
  ],
})
export class PesquisaModule {}
