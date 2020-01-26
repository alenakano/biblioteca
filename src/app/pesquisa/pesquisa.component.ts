import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from '../util/ui.service';
import { ObrasEnum } from '../util/enums/obras.enum';
import { Resultados } from './resultados';
import { ExemplarCadastro } from '../cadastros/obras-exemplares/comum/exemplarCadastro';
import { ComumLibService } from '../cadastros/obras-exemplares/comum/comumLib.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit, OnDestroy {

  public pesquisaResponse: Resultados = new Resultados();
  public grupoExemplar: FormGroup;
  public showEditarExemplar: boolean;
  public elementoEdicao: Resultados = new Resultados();
  public subscription: Subscription;

  public categorias = [{
    id: 0,
    name: 'Disponível',
  },{
    id: 1,
    name:'Emprestado',
  },{
    id: 2,
    name:'Exemplar Perdido'
  },{
    id: 3,
    name:'Exemplar Danificado',
  }]

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private comumLibService: ComumLibService,
  ) {
    this.grupoExemplar = this.fb.group({
      identificador: [{value: null, disabled: true}, null],
      titulo: [{value: null, disabled: true}, null],
      autor: [{value: null, disabled: true}, null],
      tomo: [null, null],
      local: [null, Validators.required],
      dataAquisicao: [null, Validators.required],
      numExemplar: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditarExemplar(elemento: Resultados): void {
    this.elementoEdicao = elemento;
    this.grupoExemplar = this.fb.group({
      identificador: [{value: elemento.identificador, disabled: true}, null],
      titulo: [{value: elemento.titulo, disabled: true}, null],
      autor: [{value: elemento.autor, disabled: true}, null],
      tomo: [{value: elemento.tomo, disabled: false}, null],
      local: [{value: elemento.local, disabled: false}, Validators.required],
      dataAquisicao: [{value: elemento.dataAquisicao, disabled: false}, Validators.required],
      numExemplar: [{value: elemento.numExemplar, disabled: false}, Validators.required],
      status: [null, Validators.required],
    });

    this.grupoExemplar.get('status').setValue(elemento.status);

    this.showEditarExemplar = true;

  }

  onIDValue(): string {
    switch (this.pesquisaResponse.idTipo) {
      case ObrasEnum.LIVROS:
        return 'Digite o ISBN';
      case ObrasEnum.MÍDIA:
        return 'Digite o DOI';
      case ObrasEnum.PERIODICOS:
        return 'Digite o ISSN';
      default: {
        return 'Digite o identificador';
      }
    }
  }

  onObraValue(pesquisaValue: Resultados) {
    if (!pesquisaValue) {
    }
    this.pesquisaResponse = pesquisaValue;
  }

  onFormExemplarSubmit(form: ExemplarCadastro) {
    form.idExemplar = this.elementoEdicao.idExemplar;
    form.idObra = this.elementoEdicao.idObra;
    form.dataCadastro = this.elementoEdicao.dataCadastro;
    this.subscription = this.comumLibService.atualizarExemplar(form).subscribe(
      value => {
        this.uiService.showSnackbar(value.message, null, {duration: 3000});
      },
      error => {
        this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      }
    );
    this.pesquisaResponse = null;
    this.showEditarExemplar = false;
  }

}
