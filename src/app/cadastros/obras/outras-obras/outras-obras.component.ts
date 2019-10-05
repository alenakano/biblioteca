import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { categorias } from './categorias';
import { UIService } from 'src/app/util/ui.service';
import { OutrasObrasCadastro } from './outras-obrasCadastro';
import { Subscription } from 'rxjs';
import { OutrasObrasService } from './outras-obras-service';

@Component({
  selector: 'app-outras-obras',
  templateUrl: './outras-obras.component.html',
  styleUrls: ['./outras-obras.component.css']
})
export class OutrasObrasComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('ngForm', null) form;

  grupoOutra: FormGroup;
  lista: Array<any>;

  public cadastro: OutrasObrasCadastro = new OutrasObrasCadastro();
  public updateDB = false;
  public hideForm = false;
  public selected: string;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private outrasObrasService: OutrasObrasService,
  ) {
    this.lista = categorias;
    this.grupoOutra = fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      controlId: [null, Validators.required],
      local: [null, Validators.required],
      date_acquisition: [null, Validators.required],
      type_other: [null, Validators.required],
      country: [null, Validators.required],
      qtd: [null, Validators.required],
      description: [null, null],
    });
   }

  ngOnInit() {
  }
  public cadastroMidia(): void {
    this.cadastroSubscription = this.outrasObrasService.cadastrar(this.cadastro).subscribe(
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
      this.cadastroMidia();
    } else {
      this.updateMidia();
    }

  }

  onConfirmacao(evento: boolean) {
    if (evento) {
      this.outrasObrasService.pesquisar(this.cadastro).subscribe(
        res => {
          this.updateDB = true;
          this.cadastro = res[0];
          this.hideForm = false;
          this.grupoOutra = this.fb.group({
            title: [res[0].title, Validators.required],
            author: [res[0].author, Validators.required],
            controlId: [res[0].controlId, Validators.required],
            local: [res[0].local, Validators.required],
            date_acquisition: [res[0].date_acquisition, Validators.required],
            type_other: [res[0].type_other, Validators.required],
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

  public updateMidia(): void {
    this.updateDB = false;
    this.updateSubscription = this.outrasObrasService.atualizar(this.cadastro).subscribe(
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
