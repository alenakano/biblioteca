import { NgModule } from '@angular/core';

import { CommonModule } from '../common/common.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../util/shared.module';
import { RelatoriosComponent } from './relatorios.component';

@NgModule({
  declarations: [
    RelatoriosComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RelatoriosRoutingModule,
  ],
  exports: [
    RelatoriosComponent,
  ],
})
export class RelatoriosModule {}
