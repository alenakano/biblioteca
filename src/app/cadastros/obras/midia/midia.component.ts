import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { categorias } from './categorias';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {
  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();

  grupoMidia: FormGroup;
  lista: Array<any>;

  public selected: string;

  constructor(private fb: FormBuilder) {
    this.lista = categorias;
    this.grupoMidia = fb.group({
      nomeMidia: [null, Validators.required],
      nomeAutor: [null, Validators.required],
      cat: [null, Validators.required],
      doi: [null, Validators.required],
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
