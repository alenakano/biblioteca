import { NgModule } from '@angular/core';
import { CadastrosComponent } from './cadastros.component';
import { CommonModule } from '../common/common.module';
import { ComumLibComponent } from './obras/comum/comumLib.component';
import { ObrasComponent } from './obras/obras.component';
import { ObrasOpcoesComponent } from './obras/obras-opcoes/obras-opcoes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../util/shared.module';
import { CadastroRoutingModule } from './cadastro-routing.module';

import { comumReducer } from './obras/comum/comumLib.reducer';
import { StoreModule } from '@ngrx/store';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

@NgModule({
  declarations: [
    CadastrosComponent,
    ComumLibComponent,
    ObrasComponent,
    ObrasOpcoesComponent,
    UsuariosComponent,
    EditUsuarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CadastroRoutingModule,
    // Reduce para feature -> tratamento para Lazy Load
    StoreModule.forFeature('categoria', comumReducer)
  ],
  exports: [
    CadastrosComponent,
    ComumLibComponent,
    ObrasComponent,
    ObrasOpcoesComponent,
    UsuariosComponent,
  ],
})
export class CadastrosModule {}
