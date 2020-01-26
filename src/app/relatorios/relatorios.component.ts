import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/util/ui.service';

import { RelatoriosService } from './relatorios.service';


@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnDestroy, OnInit {

  constructor(
    private relatoriosService: RelatoriosService,
    private uiService: UIService,
  ) {}

  public emprestadosSubscription: Subscription;
  public bloqueadosSubscription: Subscription;
  public atrasadosSubscription: Subscription;


  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    if (this.emprestadosSubscription) {
      this.emprestadosSubscription.unsubscribe();
    }
    if (this.bloqueadosSubscription) {
      this.bloqueadosSubscription.unsubscribe();
    }
    if (this.atrasadosSubscription) {
      this.atrasadosSubscription.unsubscribe();
    }
  }

  public onEmprestadosClick(): void {
    this.emprestadosSubscription =
      this.relatoriosService.livrosEmprestados().subscribe(
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
          link.download = 'relatorio-emprestimos.pdf';
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

  public onAtrasadosClick(): void {
    this.emprestadosSubscription =
      this.relatoriosService.livrosAtrasados().subscribe(
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
          link.download = 'relatorio-atrasos.pdf';
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

  public onBloqueadosClick(): void {
    this.emprestadosSubscription =
      this.relatoriosService.usuariosBloqueados().subscribe(
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
          link.download = 'relatorio-usuarios-bloqueados.pdf';
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
