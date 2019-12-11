import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  @ViewChild('f', null) form;

  emprestimoSubscription: Subscription;
  minDate: Date;
  emprestimo: Date = new Date();
  devolucao: Date = new Date();

  constructor(
    private transacaoService: TransacaoService,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.devolucao = new Date(this.devolucao.setDate(this.devolucao.getDate() + 7));
  }

  ngOnDestroy(): void {

  }

  onSubmit(form: any): void {
    const emprestimo: Emprestimo = new Emprestimo();
    emprestimo.dataEmprestimo = form.dataEmprestimo;
    emprestimo.dataPrevisao = form.dataPrevisao;
    emprestimo.idExemplar = form.idExemplar;
    const cpf = form.CPF;
    emprestimo.identificador = form.identificador;
    emprestimo.numExemplar = form.numExemplar;
    emprestimo.dataPrevisao = form.dataPrevisao;
    emprestimo.dataEmprestimo = form.dataEmprestimo;
    this.emprestimoSubscription = this.transacaoService.emprestar(emprestimo, cpf).subscribe(
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
          this.uiService.showSnackbar('Empréstimo efetivado com sucesso.', null, {duration: 3000});
      },
      error => {
        if (error.status === 494) {
          this.uiService.showSnackbar('Usuário está bloqueado. Verifique.', null, {duration: 3000});
          return;
        }
        if (error.status === 497) {
          this.uiService.showSnackbar('Obra danificada ou extraviada. Verifique.', null, {duration: 3000});
          return;
        }
        this.uiService.showSnackbar('Falha ao realizar empréstimo. Verifique dados e se título já está emprestado', null, {duration: 3000});
      }
    );
  }
}
