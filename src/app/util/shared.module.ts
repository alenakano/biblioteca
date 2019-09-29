import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

// tslint:disable-next-line: jsdoc-format
/** ReactiveFormsModule utilizado para capturar valor de select do angular material em forms. Vide outras-opcoes-component **/
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
