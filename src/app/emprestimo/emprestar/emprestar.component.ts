import { Component, OnInit } from '@angular/core';
import { Transacoes } from '../transacoes';
import { TransacaoService } from '../transacao.service';
import { UIService } from 'src/app/util/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emprestar',
  templateUrl: './emprestar.component.html',
  styleUrls: ['./emprestar.component.css']
})
export class EmprestarComponent implements OnInit {

  emprestimoSubscription: Subscription;

  constructor(
    private transacaoService: TransacaoService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: Transacoes): void {
    this.emprestimoSubscription = this.transacaoService.emprestar(form).subscribe(
      value => this.uiService.showSnackbar(value.message, null, {duration: 3000}),
      error => this.uiService.showSnackbar(error.message, null, {duration: 3000}),
    );
  }

}
