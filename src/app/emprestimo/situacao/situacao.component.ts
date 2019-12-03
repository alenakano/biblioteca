import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Situacao } from './situacao';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/util/ui.service';
import { SituacaoService } from './situacao.service';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css']
})
export class SituacaoComponent implements OnInit, OnDestroy {

  @ViewChild('f', null) form;
  @ViewChild('fInfos', null) formSituacao;

  public maxDate;
  public situacao: FormGroup;
  public showSituacao: boolean;
  public userSituacao: Situacao = new Situacao();

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private situacaoService: SituacaoService,
  ) {
    this.situacao = this.fb.group({
      cpf: [null, Validators.required],
      status: [null, Validators.required],
      date_block: [null, null],
      date_unblock: [null, null],
    });
  }

  ngOnInit() {
    this.maxDate = new Date();
  }

  ngOnDestroy() {
    if (this.cadastroSubscription) {
      this.cadastroSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

  }

  onSubmit(form: NgForm): void {
    let userConsulta: Situacao = new Situacao();
    userConsulta = form.value;
    this.cadastroSubscription = this.situacaoService.pesquisar(userConsulta).subscribe(
      value => {
        this.showSituacao = true;
        this.uiService.showSnackbar('Usuário encontrado. Atualize a situação.', null, {duration: 3000});
        this.userSituacao = value;
        this.situacao = this.fb.group({
          cpf: new FormControl({ value: value.cpf, disabled: true }),
          status: [value.status, Validators.required],
          date_block: [value.date_block, null],
          date_unblock: [value.date_unblock, null],
        });
      },
      error => {
        this.showSituacao = false;
        this.uiService.showSnackbar('Erro ao buscar usuário. Verifique cadastro ou tente mais tarde.', null, {duration: 3000});
      }
    );
  }

  onSituacaoSubmit(situacao: Situacao) {
    situacao.cpf = this.userSituacao.cpf;
    situacao = this.validateDate(situacao);
    if (Date.parse(this.userSituacao.date_unblock.toString()) >= Date.parse(this.userSituacao.date_unblock.toString())) {
      this.uiService.showSnackbar(
        'Data de fim de multa menor da data de início de multa. Por favor, tente novamente.',
        null ,
        {duration: 3000}
      );
      return;
    }
    this.showSituacao = false;
    this.updateSubscription = this.situacaoService.atualizar(this.userSituacao).subscribe (
      value => this.uiService.showSnackbar(value.message, null, {duration: 3000}),
      erro => this.uiService.showSnackbar(erro.message, null, {duration: 3000})
    );
  }

  validateDate(situacao: Situacao): Situacao {
    let dataAtual = new Date();
    if (Date.parse(this.userSituacao.date_unblock.toString()) <= dataAtual.getTime()) {
      this.userSituacao.status = false;
      this.userSituacao.date_block = undefined;
      this.userSituacao.date_unblock = undefined;
      return this.userSituacao;
    } else {
      this.userSituacao.status = true;
      this.userSituacao.date_block = situacao.date_block;
      this.userSituacao.date_unblock = situacao.date_unblock;
      return this.userSituacao;
    }
  }

  voltar(): void {
    this.showSituacao = false;
  }

}
