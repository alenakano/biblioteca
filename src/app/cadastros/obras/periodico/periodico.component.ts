import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { categorias } from './categorias';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-periodico',
  templateUrl: './periodico.component.html',
  styleUrls: ['./periodico.component.css']
})
export class PeriodicoComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();

  grupoPeriodico: FormGroup;
  lista: Array<any>;

  public selected: string;

  constructor(private fb: FormBuilder) {
    this.lista = categorias;
    this.grupoPeriodico = fb.group({
      nomePeriodico: [null, Validators.required],
      nomeEditora: [null, Validators.required],
      cat: [null, Validators.required],
      isbn: [null, Validators.required],
      local: [null, Validators.required],
      data: [null, Validators.required],
      categoria: [null, Validators.required],
      pais: [null, Validators.required],
      obs: [null, null],
    });
   }

  ngOnInit() {
  }

  onFormOpcoesSubmit(cadastro: any) {
    console.log(cadastro);
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
