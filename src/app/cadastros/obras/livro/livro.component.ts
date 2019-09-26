import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaLivros } from './CategoriaLivros';
import { LivroService } from './livro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit, OnDestroy {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  listaSubscription: Subscription;

  grupoLivro: FormGroup;
  lista: Array<any>;

  public selected: string;

  constructor(private fb: FormBuilder, private livroService: LivroService) {
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
    this.listaSubscription = this.livroService.catLivros.subscribe(res =>
      this.lista = res
    );
  }

  ngOnDestroy(): void {
    if (this.listaSubscription) {
      this.listaSubscription.unsubscribe();
    }
  }

  onFormOpcoesSubmit(cadastro: any) {
    console.log(cadastro);
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
