import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { UsuariosCadastro } from '../usuarios/usuariosCadastro';
import { UIService } from 'src/app/util/ui.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  @Output() emitUser: EventEmitter<UsuariosCadastro> = new EventEmitter<UsuariosCadastro>();
  public cpf: string;
  cpfSubscription: Subscription;

  constructor(
    private usuariosService: UsuariosService,
    private uiService: UIService,
  ) {
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    const usuario: UsuariosCadastro = new UsuariosCadastro();
    usuario.cpf = form.cpf;
    this.cpfSubscription = this.usuariosService.pesquisar(form).subscribe(
      value => {
        if (value) {
          this.uiService.showSnackbar(value.message, null, {duration: 3000});
          this.onUserValue(value[0]);
        } else {
          this.uiService.showSnackbar(value.message, null, {duration: 3000});
        }
      },
      error => console.log(error)
    );
  }

  onUserValue(value: UsuariosCadastro) {
      this.emitUser.emit(value);
  }
}
