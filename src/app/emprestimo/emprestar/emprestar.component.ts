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
      x => {
        // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          const newBlob = new Blob([x], { type: 'application/pdf' });

          // IE doesn't allow using a blob object directly as link href
          // instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }

          // For other browsers: 
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);

          const link = document.createElement('a');
          link.href = data;
          link.download = 'recibo.pdf';
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

          setTimeout(() => {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(data);
              link.remove();
          }, 100);
      },
      error => this.uiService.showSnackbar(error.message, null, {duration: 3000}),
    );
  }

}
