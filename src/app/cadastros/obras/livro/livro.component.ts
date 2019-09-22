import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { categorias } from './categorias';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();

  grupoLivro: FormGroup;
  lista: Array<any>;

  public selected: string;

  constructor(private fb: FormBuilder) {
    this.lista = categorias;
    this.grupoLivro = fb.group({
      nomeLivro: [null, Validators.required],
      nomeAutor: [null, Validators.required],
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
