import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transacoes } from '../transacoes';
import { Subscription } from 'rxjs';
import { TransacaoService } from '../transacao.service';
import { UIService } from 'src/app/util/ui.service';

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

  onSubmit(form: Transacoes): void {
    this.devolucaoSubscription = this.transacaoService.devolver(form).subscribe(
      value => this.uiService.showSnackbar(value.message, null, {duration: 3000}),
      error => this.uiService.showSnackbar(error.message, null, {duration: 3000}),
    );
  }

  ngOnDestroy(): void {
    if (this.devolucaoSubscription) {
      this.devolucaoSubscription.unsubscribe();
    }
  }

}
