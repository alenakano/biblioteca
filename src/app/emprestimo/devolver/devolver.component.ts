import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/util/ui.service';
import { Emprestimo } from '../emprestar/emprestimo';
import { TransacaoService } from '../transacao.service';
import { Devolucao } from './devolucao';

@Component({
  selector: 'app-devolver',
  templateUrl: './devolver.component.html',
  styleUrls: ['./devolver.component.css']
})
export class DevolverComponent implements OnDestroy, OnInit {

  devolucaoSubscription: Subscription;
  devolucao: Devolucao = new Devolucao();

  constructor(
    private transacaoService: TransacaoService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: Devolucao): void {
    this.devolucao = form;
    this.devolucao.dataDevolucao = new Date();
    this.devolucaoSubscription = this.transacaoService.devolver(this.devolucao).subscribe(
      value => this.uiService.showSnackbar(value.message, null, {duration: 3000}),
      error => {
        this.onErrorDevolucao(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.devolucaoSubscription) {
      this.devolucaoSubscription.unsubscribe();
    }
  }

  onErrorDevolucao(msg: any): void {
    switch (msg.status) {
      case 412: {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        break;
      }
      case 490: {
        this.uiService.showSnackbar('Nenhum empréstimo encontrado', null, {duration: 3000});
        break;
      }
      case 491: {
        this.uiService.showSnackbar('Nenhum usuário encontrado', null, {duration: 3000});
        break;
      }
      case 492: {
        this.uiService.showSnackbar('Usuário em atraso. Conta bloqueada 7 dias', null, {duration: 3000});
        break;
      }
      case 493: {
        this.uiService.showSnackbar('Erro na entrega. Bloquear usuário e efetuar a devolução novamente', null, {duration: 3000});
        break;
      }
      default: this.uiService.showSnackbar('Problemas de conexão. Por favor, tente mais tarde', null, {duration: 3000});
    }
  }
}
