import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UIService } from 'src/app/util/ui.service';
import { UsuariosService } from './usuarios.service';
import { Subscription } from 'rxjs';
import { UsuariosCadastro } from './usuariosCadastro';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnChanges, OnInit {

  @Input() initUser: UsuariosCadastro = new UsuariosCadastro();
  @ViewChild('f', null) form;

  public maxDate;
  public todayDate;
  lista: Array<any>;
  public cadastro: UsuariosCadastro = new UsuariosCadastro();

  public updateDB = false;
  public hideForm = false;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  constructor(
    private uiService: UIService,
    private usuariosService: UsuariosService,
  ) {}

  ngOnChanges() {
    if (this.initUser.idUsuario) {
      this.updateDB = true;
      this.cadastro = this.initUser;
    }
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!this.updateDB) {
      this.cadastroUsuario();
    } else {
      this.updateUsuario(form);
    }
  }


  public cadastroUsuario(): void {
    this.cadastroSubscription = this.usuariosService.cadastrar(this.cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        this.form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

  onConfirmacao(evento: boolean) {
    if (evento) {
      this.usuariosService.pesquisar(this.cadastro).subscribe(
        res => {
          this.updateDB = true;
          this.cadastro = res[0];
          this.hideForm = false;
          });
      } else {
      this.hideForm = false;
    }
  }

  public onServiceCreateError(error) {
    if (error.status === 412) {
      this.hideForm = true;
      this.uiService.showSnackbar(error.error.message, null, {duration: 3000});
    } else {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      this.cadastro.clearUser();
    }
  }

  public updateUsuario(form: NgForm): void {
    this.updateDB = false;
    this.updateSubscription = this.usuariosService.atualizar(this.cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

}
