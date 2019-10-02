import { NgModule } from '@angular/core';
import { ConfirmacaoComponent } from '../common/confirmacao/confirmacao.component';
import { SharedModule } from '../util/shared.module';

@NgModule({
  declarations: [
    ConfirmacaoComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ConfirmacaoComponent,
  ],
})
export class CommonModule {}
