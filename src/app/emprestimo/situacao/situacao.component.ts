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
  public cpf: string;

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
      dataBloqueio: [null, null],
      dataDesbloqueio: [null, null],
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
    this.cpf = form.value.cpf;
    this.cadastroSubscription = this.situacaoService.pesquisar(this.cpf).subscribe(
      value => {
        this.showSituacao = true;
        this.uiService.showSnackbar('Usuário encontrado. Atualize a situação.', null, {duration: 3000});
        this.userSituacao = value;
        console.log('VALUE', value)
        this.situacao = this.fb.group({
          cpf: new FormControl({ value: value.cpf, disabled: true }),
          status: [value.status, Validators.required],
          dataBloqueio: [value.dataBloqueio, null],
          dataDesbloqueio: [value.dataDesbloqueio, null],
        });
      },
      error => {
        this.showSituacao = false;
        this.uiService.showSnackbar('Erro ao buscar usuário. Verifique cadastro ou tente mais tarde.', null, {duration: 3000});
      }
    );
  }

  onSituacaoSubmit(situacao: Situacao) {
    this.userSituacao.status = situacao.status;
    this.userSituacao.dataBloqueio = situacao.dataBloqueio.format('DD/MM/YYYY HH:mm:ss');
    this.userSituacao.dataDesbloqueio = situacao.dataDesbloqueio.format('DD/MM/YYYY HH:mm:ss');
    this.userSituacao.cpf = this.cpf;
    if (
      Date.parse(this.userSituacao.dataBloqueio) >=
      Date.parse(this.userSituacao.dataDesbloqueio)) {
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
    const dataAtual = new Date();
    if (Date.parse(situacao.dataDesbloqueio.format('DD/MM/YYYY HH:mm:ss')) <= dataAtual.getTime()) {
      this.userSituacao.status = 0;
      this.userSituacao.dataBloqueio = undefined;
      this.userSituacao.dataDesbloqueio = undefined;
      return this.userSituacao;
    } else {
      this.userSituacao.status = 1;
      this.userSituacao.dataBloqueio = situacao.dataBloqueio;
      this.userSituacao.dataDesbloqueio = situacao.dataDesbloqueio;
      return this.userSituacao;
    }
  }

  voltar(): void {
    this.showSituacao = false;
  }

}
