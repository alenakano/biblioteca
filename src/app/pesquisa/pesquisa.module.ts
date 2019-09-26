import { NgModule } from '@angular/core';

import { NovaComponent } from './nova/nova.component';
import { PesquisaComponent } from './pesquisa.component';
import { PesquisaRoutingModule } from './pesquisa-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';
import { SharedModule } from '../util/shared.module';

@NgModule({
  declarations: [
    NovaComponent,
    PesquisaComponent,
    ResultadosComponent,
  ],
  imports: [
    SharedModule,
    PesquisaRoutingModule,
  ],
  exports: [
    NovaComponent,
    PesquisaComponent,
    ResultadosComponent,
  ],
})
export class PesquisaModule {}
