import { NgModule } from '@angular/core';
import { ConfirmacaoComponent } from '../common/confirmacao/confirmacao.component';
import { SharedModule } from '../util/shared.module';
import { ValidaCpfDirective } from '../util/validaCPF.directive';

@NgModule({
  declarations: [
    ConfirmacaoComponent,
    ValidaCpfDirective,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ConfirmacaoComponent,
    ValidaCpfDirective,

  ],
})
export class CommonModule {}
