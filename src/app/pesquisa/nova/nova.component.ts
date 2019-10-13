import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Pesquisa } from './pesquisa';
import { NovaService } from './nova.service';
import { UIService } from 'src/app/util/ui.service';
import { Subscription } from 'rxjs';
import { PesquisaResponse } from './pesquisaResponse';

@Component({
  selector: 'app-nova',
  templateUrl: './nova.component.html',
  styleUrls: ['./nova.component.css']
})
export class NovaComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  @Output() obraPesquisa: EventEmitter<PesquisaResponse[]> = new EventEmitter<PesquisaResponse[]>();

  constructor(
    private novaService: NovaService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(form: Pesquisa): void {
    this.subscription = this.novaService.pesquisar(form).subscribe(
      value => this.obraPesquisa.emit(value),
      erro => this.uiService.showSnackbar(erro.message, null, {duration: 3000})
    );
  }

}
