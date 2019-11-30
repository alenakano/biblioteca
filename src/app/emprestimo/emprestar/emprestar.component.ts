import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from 'src/app/util/ui.service';
import { Subscription } from 'rxjs';
import { Emprestimo } from './emprestimo';
import { TransacaoService } from '../transacao.service';

@Component({
  selector: 'app-emprestar',
  templateUrl: './emprestar.component.html',
  styleUrls: ['./emprestar.component.css']
})
export class EmprestarComponent implements OnDestroy, OnInit {

  emprestimoSubscription: Subscription;
  minDate: Date;

  constructor(
    private transacaoService: TransacaoService,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
  }

  ngOnDestroy(): void {

  }

  onSubmit(form: any): void {
    const emprestimo: Emprestimo = form;
    emprestimo.dateDevolucao = form.dateDevolucao.format();
    emprestimo.dateEmprestimo = form.dateEmprestimo.format();
    this.emprestimoSubscription = this.transacaoService.emprestar(form).subscribe(
      value => this.uiService.showSnackbar(value.message, null, {duration: 3000}),
      error => this.uiService.showSnackbar(error.message, null, {duration: 3000}),
    );
  }

}
