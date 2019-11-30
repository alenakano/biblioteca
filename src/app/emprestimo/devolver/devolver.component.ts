import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/util/ui.service';
import { Emprestimo } from '../emprestar/emprestimo';
import { TransacaoService } from '../transacao.service';

@Component({
  selector: 'app-devolver',
  templateUrl: './devolver.component.html',
  styleUrls: ['./devolver.component.css']
})
export class DevolverComponent implements OnDestroy, OnInit {

  devolucaoSubscription: Subscription;

  constructor(
    private transacaoService: TransacaoService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: Emprestimo): void {
    this.devolucaoSubscription = this.transacaoService.devolver(form).subscribe(
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
    if (msg.status === 412) {
      this.uiService.showSnackbar(msg.message, null, {duration: 3000});
    } else {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
    }
  }

}
