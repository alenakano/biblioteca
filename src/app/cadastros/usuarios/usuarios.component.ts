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

  public maxDate;
  lista: Array<any>;
  public cadastro: UsuariosCadastro = new UsuariosCadastro();

  public updateDB = false;
  public grupoUsuarios: FormGroup;
  public hideForm = false;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private uiService: UIService,
    private usuariosService: UsuariosService,
  ) {
    this.grupoUsuarios = this.fb.group({
      name: [null, Validators.required],
      cpf: [null, Validators.required],
      datebirth: [null, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      complement: [null, Validators.required],
      city: [null, Validators.required],
    });
  }

  ngOnChanges() {
    if (this.initUser) {
      this.updateDB = true;
      this.cadastro = this.initUser;
    }
  }

  ngOnInit() {
    this.maxDate = new Date();
    //Mínimo de 16 anos para poder se cadastrar na biblioteca
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 12);
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
          this.grupoUsuarios = res;
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
