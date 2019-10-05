import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { categorias } from './categorias';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { PeriodicoCadastro } from './periodicoCadastro';
import { Subscription } from 'rxjs';
import { PeriodicoService } from './periodico.service';
import { UIService } from 'src/app/util/ui.service';

@Component({
  selector: 'app-periodico',
  templateUrl: './periodico.component.html',
  styleUrls: ['./periodico.component.css']
})
export class PeriodicoComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('ngForm', null) form;

  lista: Array<any>;

  public cadastro: PeriodicoCadastro = new PeriodicoCadastro();
  public updateDB = false;
  public grupoPeriodico: FormGroup;
  public hideForm = false;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  public selected: string;

  constructor(
    private fb: FormBuilder,
    private periodicoService: PeriodicoService,
    private uiService: UIService,
    ) {
    this.lista = categorias;
    this.grupoPeriodico = fb.group({
      title: [null, Validators.required],
      publisher: [null, Validators.required],
      issn: [null, Validators.required],
      local: [null, Validators.required],
      date_acquisition: [null, Validators.required],
      type_mag: [null, Validators.required],
      country: [null, Validators.required],
      qtd: [null, Validators.required],
      description: [null, null],
    });
   }

  ngOnInit() {
  }

  public cadastroPeriodico(): void {
    this.cadastroSubscription = this.periodicoService.cadastrar(this.cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        this.form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return  o1.id === o2.id;
    }
  }

  onFormOpcoesSubmit(cad: Form | any) {
    this.cadastro = cad;
    if (!this.updateDB) {
      this.cadastroPeriodico();
    } else {
      this.updatePeriodico();
    }

  }

  onConfirmacao(evento: boolean) {
    if (evento) {
      this.periodicoService.pesquisar(this.cadastro).subscribe(
        res => {
          this.updateDB = true;
          this.cadastro = res[0];
          this.hideForm = false;
          this.grupoPeriodico = this.fb.group({
            title: [res[0].title, Validators.required],
            publisher: [res[0].publisher, Validators.required],
            issn: [res[0].issn, Validators.required],
            local: [res[0].local, Validators.required],
            date_acquisition: [res[0].date_acquisition, Validators.required],
            type_mag: [res[0].type_mag, Validators.required],
            country: [res[0].country, Validators.required],
            qtd: [res[0].qtd, Validators.required],
            description: [res[0].description, null],
          });
        }
      );
    } else {
      this.hideForm = false;
    }
  }

  public onServiceCreateError(error) {
    this.form.resetForm();
    if (error.status === 412) {
      this.hideForm = true;
      this.uiService.showSnackbar(error.error.message, null, {duration: 3000});
    } else {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      this.form.resetForm();
    }
  }

  public updatePeriodico(): void {
    this.updateDB = false;
    this.updateSubscription = this.periodicoService.atualizar(this.cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        this.form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
