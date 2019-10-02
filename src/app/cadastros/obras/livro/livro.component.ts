import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Store } from '@ngrx/store';


import { CategoriaLivros } from './CategoriaLivros';
import { LivroService } from './livro.service';
import { Observable, Subscription } from 'rxjs';
import * as fromCategoria from './livro.reducer';
import { LivroCadastro } from './livroCadastro';
import { UIService } from 'src/app/util/ui.service';


@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit, OnDestroy {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('ngForm', null) form;

  livrosCategoria$: Observable<CategoriaLivros[]>;

  grupoLivro: FormGroup;
  cadastroSubscription: Subscription;
  hideForm = false;

  public selected: string;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private store: Store<fromCategoria.State>,
    private uiService: UIService,
  ) {
    this.grupoLivro = fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      isbn: [null, Validators.required],
      location: [null, Validators.required],
      date_acquisition: [null, Validators.required],
      type_book: [null, Validators.required],
      country: [null, Validators.required],
      qtd: [null, Validators.required],
      description: [null, null],
    });
   }

  ngOnInit() {
    this.livroService.fetchLivros();
    this.livrosCategoria$ = this.store.select(fromCategoria.getCategoriasLivro);
  }

  ngOnDestroy(): void {
    if (this.cadastroSubscription) {
      this.cadastroSubscription.unsubscribe();
    }
  }

  onFormOpcoesSubmit(cad: Form | any) {
    const cadastro: LivroCadastro = cad;
    cadastro.date_acquisition = cad.date_acquisition.format('YYYY-MM-DD');
    this.cadastroSubscription = this.livroService.cadastrar(cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        this.form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

  onConfirmacao(evento) {
    console.log(evento)
  }

  public onServiceCreateError(error) {
    this.form.resetForm();
    if (error.status === 412) {
      this.hideForm = true;
      this.uiService.showSnackbar(error.error.message, null, {duration: 3000});
    } else {
      this.uiService.showSnackbar(error.error.message, null, {duration: 3000});
      this.form.resetForm();
    }
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
