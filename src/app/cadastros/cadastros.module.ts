import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CadastrosComponent } from './cadastros.component';
import { LivroComponent } from './obras/livro/livro.component';
import { MaterialModule } from '../material.module';
import { MidiaComponent } from './obras/midia/midia.component';
import { ObrasComponent } from './obras/obras.component';
import { ObrasOpcoesComponent } from './obras/obras-opcoes/obras-opcoes.component';
import { OutrasObrasComponent } from './obras/outras-obras/outras-obras.component';
import { PeriodicoComponent } from './obras/periodico/periodico.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    CadastrosComponent,
    LivroComponent,
    ObrasComponent,
    MidiaComponent,
    ObrasOpcoesComponent,
    OutrasObrasComponent,
    PeriodicoComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CadastrosComponent,
    LivroComponent,
    ObrasComponent,
    MidiaComponent,
    ObrasOpcoesComponent,
    OutrasObrasComponent,
    PeriodicoComponent,
    UsuariosComponent,
  ],
})
export class CadastrosModule {}
