import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { categorias } from './categorias';
import { MidiaCadastro } from './midiaCadastro';
import { Subscription } from 'rxjs';
import { MidiaService } from './midia.service';
import { UIService } from 'src/app/util/ui.service';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('ngForm', null) form;

  grupoMidia: FormGroup;
  lista: Array<any>;
  public cadastro: MidiaCadastro = new MidiaCadastro();
  public updateDB = false;
  public hideForm = false;
  public selected: string;

  cadastroSubscription: Subscription;
  updateSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private midiaService: MidiaService,
    private uiService: UIService,
  ) {
    this.lista = categorias;
    this.grupoMidia = fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      doi: [null, Validators.required],
      local: [null, Validators.required],
      date_acquisition: [null, Validators.required],
      type_midia: [null, Validators.required],
      country: [null, Validators.required],
      qtd: [null, Validators.required],
      description: [null, null],
    });
   }

  ngOnInit() {
  }

  public cadastroMidia(): void {
    this.cadastroSubscription = this.midiaService.cadastrar(this.cadastro).subscribe(
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
      this.midiaService.pesquisar(this.cadastro).subscribe(
        res => {
          this.updateDB = true;
          this.cadastro = res[0];
          this.hideForm = false;
          this.grupoMidia = this.fb.group({
            title: [res[0].title, Validators.required],
            author: [res[0].author, Validators.required],
            doi: [res[0].doi, Validators.required],
            local: [res[0].local, Validators.required],
            date_acquisition: [res[0].date_acquisition, Validators.required],
            type_midia: [res[0].type_midia, Validators.required],
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
    this.updateSubscription = this.midiaService.atualizar(this.cadastro).subscribe(
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
