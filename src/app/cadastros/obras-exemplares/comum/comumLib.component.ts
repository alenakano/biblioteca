import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CategoriaComum } from './categoriaComum';
import { ExemplarCadastro } from './exemplarCadastro';
import { IdentificadorObra } from './identificador-obra';
import { ComumLibService } from './comumLib.service';
import { ObraCadastro } from './obraCadastro';
import { UIService } from 'src/app/util/ui.service';
import * as fromCategoria from './comumLib.reducer';
import { ObrasEnum } from '../obras.enum';


@Component({
  selector: 'app-comum',
  templateUrl: './comumLib.component.html',
  styleUrls: ['./comumLib.component.css']
})
export class ComumLibComponent implements OnInit, OnDestroy {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @Input() tipoObra: ObrasEnum;
  @ViewChild('ngForm', null) form;
  @ViewChild('obraTipoForm', null) obraTipoForm;
  @ViewChild('exemplarForm', null) exemplarForm;

  livrosCategoria$: Observable<CategoriaComum[]>;

  public obraCadastro: ObraCadastro = new ObraCadastro();
  public exemplarCadastro: ExemplarCadastro = new ExemplarCadastro();
  public identificador: IdentificadorObra = new IdentificadorObra();
  public grupoID: FormGroup;
  public grupoExemplar: FormGroup;
  public grupoObra: FormGroup;
  public updateObra = false;
  public hideObraTipo = false;
  public hideObra = true;
  public hideExemplar = true;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;
  fetchExemplarSubscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private comumLibService: ComumLibService,
    private store: Store<fromCategoria.State>,
    private uiService: UIService,
  ) {

    this.grupoID = this.fb.group({
      identificador: [null, Validators.required],
    });

    this.grupoObra = this.fb.group({
      identificador: [null, Validators.required],
      titulo: [null, Validators.required],
      autor: [null, Validators.required],
      ano: [null, [Validators.required, Validators.minLength(4)]],
      pais: [null, Validators.required],
      editora: [null, Validators.required],
      descricao: [null, null],
      idioma: [null, Validators.required],
      CDD: [null, Validators.required],
    });

    this.grupoExemplar = this.fb.group({
      identificador: [{value: this.obraCadastro.identificador, disabled: true}, null],
      titulo: [{value: this.obraCadastro.titulo, disabled: true}, null],
      autor: [{value: this.obraCadastro.autor, disabled: true}, null],
      tomo: [null, null],
      local: [null, Validators.required],
      dataAquisicao: [null, Validators.required],
      numExemplar: [this.exemplarCadastro.numExemplar, Validators.required],
      status: [null, Validators.required],
    });

   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.cadastroSubscription) {
      this.cadastroSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.fetchExemplarSubscription) {
      this.fetchExemplarSubscription.unsubscribe();
    }
  }

  onFormObraTipoSubmit(cad: Form | any) {
    this.identificador.identificador = cad.identificador;
    this.cadastroSubscription = this.comumLibService.consultaObra(this.identificador).subscribe(
      res => {
        this.updateObra = true;
        this.hideObraTipo = true;
        this.hideObra = false;
        this.obraCadastro = res[0];
        this.startObraForm(true);
        this.uiService.showSnackbar('Obra já cadastrada. Atualize ou continue para exemplares.', null, {duration: 3000});
      },
      error => this.onServiceObraTipoError(error)
    );
  }

  onFormExemplarSubmit(cad: Form | any) {
    this.exemplarCadastro = cad;
    this.exemplarCadastro.idObra = this.obraCadastro.idObra;
    this.exemplarCadastro.dataAquisicao = cad.dataAquisicao.format();

    this.cadastroSubscription = this.comumLibService.cadastrarExemplar(this.exemplarCadastro).subscribe(
      res => {
        this.uiService.showSnackbar(res.message, null, {duration: 3000});
        this.voltar();
      },
      error => this.onServiceCreateError(error)
    );
  }

  onFormObrasSubmit(cad: Form | any) {

    this.obraCadastro = { ...this.obraCadastro, ...cad };
    this.obraCadastro.identificador = this.identificador.identificador;
    this.obraCadastro.idTipo = this.tipoObra;

    if (this.updateObra) {
      this.cadastroSubscription = this.comumLibService.atualizarObra(this.obraCadastro).subscribe(
        msg => {
          this.uiService.showSnackbar(msg.message, null, {duration: 3000});
          this.onStepExemplar();
        },
        error => this.onServiceCreateError(error)
      );
    } else {
      this.cadastroSubscription = this.comumLibService.cadastrarObra(this.obraCadastro).subscribe(
        msg => {
          this.uiService.showSnackbar(msg.message, null, {duration: 3000});
          this.onStepExemplar();
          this.updateObra = true;
        },
        error => this.onServiceCreateError(error)
      );
    }
  }

  onIDValue(): string {
    switch (+this.tipoObra) {
      case ObrasEnum.LIVROS : {
        return 'Digite o ISBN';
        break;
      }
      case ObrasEnum.MÍDIA: {
        return 'Digite o DOI';
        break;
      }
      case ObrasEnum.PERIODICOS: {
        return 'Digite o ISSN';
        break;
      }
      default: {
        return 'Digite o identificador';
        break;
      }
    }
  }

  public onServiceCreateError(error) {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      if (this.form) {
        this.form.resetForm();
      }
      if (this.hideExemplar) {
        this.obraTipoForm.resetForm();
      }
  }

  public onServiceObraTipoError(res) {
    if (res.status === 412) {
      this.hideObraTipo = true;
      this.hideObra = false;
      this.updateObra = false;
      this.uiService.showSnackbar('Obra não cadastrada. Por favor, insira os dados.', null, {duration: 2000});
      this.obraCadastro.identificador = this.identificador.identificador;
      this.startObraForm(false);
    } else {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 2000});
      this.hideObraTipo = false;
      this.hideExemplar = true;
      this.hideObra = true;
    }
  }

  onStepExemplar(): void {
    this.hideObraTipo = true;
    this.hideExemplar = false;
    this.hideObra = true;
    this.exemplarCadastro.idObra = this.obraCadastro.idObra;
    if (this.updateObra && this.obraCadastro.idObra) {
      this.fetchExemplarSubscription = this.comumLibService.fetchExemplar(this.exemplarCadastro.idObra).subscribe(
        res => {
          if (res.length > 0) {
            let maxNumExemplar = Math.max.apply(Math, res.map(o => o.numExemplar));
            this.exemplarCadastro.numExemplar = ++maxNumExemplar;
          } else {
            this.exemplarCadastro.numExemplar = 1;
          }
          this.startExemplarForm();
        },
        err => {
          this.uiService.showSnackbar('Não foi possível recuperar número do último exemplar cadastrado.', null, {duration: 2000});
          this.exemplarCadastro.numExemplar = 1;
          this.startExemplarForm();
        }
      );
    } else {
      this.exemplarCadastro.numExemplar = 1;
      this.startExemplarForm();
    }
  }

  startExemplarForm(): void {
    this.grupoExemplar = this.fb.group({
      identificador: [{value: this.obraCadastro.identificador, disabled: true}, null],
      titulo: [{value: this.obraCadastro.titulo, disabled: true}, null],
      autor: [{value: this.obraCadastro.autor, disabled: true}, null],
      tomo: [null, null],
      local: [null, Validators.required],
      dataAquisicao: [null, Validators.required],
      numExemplar: [{value: this.exemplarCadastro.numExemplar, disabled: false}, Validators.required],
      status: [null, Validators.required],
    });
  }

  startObraForm(cadastrado: boolean): void {
    if (cadastrado) {
      this.grupoObra = this.fb.group({
        identificador: [{value: this.identificador.identificador, disabled: true}, null],
        titulo: [this.obraCadastro.titulo, Validators.required],
        autor: [this.obraCadastro.autor, Validators.required],
        ano: [this.obraCadastro.ano, [Validators.required, Validators.minLength(4)]],
        pais: [this.obraCadastro.pais, Validators.required],
        editora: [this.obraCadastro.editora, Validators.required],
        descricao: [this.obraCadastro.descricao, null],
        idioma: [this.obraCadastro.idioma, Validators.required],
        CDD: [this.obraCadastro.CDD, Validators.required],
      });
    } else {
      this.grupoObra = this.fb.group({
        identificador: [{value: this.identificador.identificador, disabled: true}, null],
        titulo: [null, Validators.required],
        autor: [null, Validators.required],
        ano: [null, [Validators.required, Validators.minLength(4)]],
        pais: [null, Validators.required],
        editora: [null, Validators.required],
        descricao: [null, null],
        idioma: [null, Validators.required],
        CDD: [null, Validators.required],
      });
    }
  }

  voltar(): void {
    this.backOptions.emit();
  }

  onVoltarExemplar(): void {
    this.hideObraTipo = true;
    this.hideExemplar = true;
    this.hideObra = false;
  }
  onVoltarObra(): void {
    this.hideObraTipo = false;
    this.hideExemplar = true;
    this.hideObra = true;
  }

}
