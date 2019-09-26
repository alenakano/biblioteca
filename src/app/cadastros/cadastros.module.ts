import { NgModule } from '@angular/core';
import { CadastrosComponent } from './cadastros.component';
import { LivroComponent } from './obras/livro/livro.component';
import { MidiaComponent } from './obras/midia/midia.component';
import { ObrasComponent } from './obras/obras.component';
import { ObrasOpcoesComponent } from './obras/obras-opcoes/obras-opcoes.component';
import { OutrasObrasComponent } from './obras/outras-obras/outras-obras.component';
import { PeriodicoComponent } from './obras/periodico/periodico.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../util/shared.module';
import { CadastroRoutingModule } from './cadastro-routing.module';

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
    SharedModule,
    CadastroRoutingModule
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
