import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';


import { CategoriaLivros } from './CategoriaLivros';
import { LivroService } from './livro.service';
import { Observable } from 'rxjs';
import * as fromCategoria from './livro.reducer';


@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  livrosCategoria$: Observable<CategoriaLivros[]>;

  grupoLivro: FormGroup;

  public selected: string;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private store: Store<fromCategoria.State>
  ) {
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
    this.livroService.fetchLivros();
    this.livrosCategoria$ = this.store.select(fromCategoria.getCategoriasLivro);
  }

  onFormOpcoesSubmit(cadastro: any) {
    console.log(cadastro);
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
