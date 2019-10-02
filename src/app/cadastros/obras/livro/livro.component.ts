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

  public cadastro: LivroCadastro = new LivroCadastro();
  grupoLivro: FormGroup;
  cadastroSubscription: Subscription;
  hideForm = false;


  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private store: Store<fromCategoria.State>,
    private uiService: UIService,
  ) {
    this.grupoLivro = this.fb.group({
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

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return  o1.id === o2.id;
    }
  }

  onFormOpcoesSubmit(cad: Form | any) {
    this.cadastro = cad;
    this.cadastro.date_acquisition = cad.date_acquisition.format('YYYY-MM-DD');
    this.cadastroSubscription = this.livroService.cadastrar(this.cadastro).subscribe(
      msg => {
        this.uiService.showSnackbar(msg.message, null, {duration: 3000});
        this.form.resetForm();
      },
      error => this.onServiceCreateError(error)
    );
  }

  onConfirmacao(evento: boolean) {
    if (evento) {
      this.livroService.pesquisar(this.cadastro).subscribe(
        res => {
          this.cadastro = res[0];
          this.hideForm = false;
          this.grupoLivro = this.fb.group({
            title: [res[0].title, Validators.required],
            author: [res[0].author, Validators.required],
            isbn: [res[0].isbn, Validators.required],
            location: [res[0].location, Validators.required],
            date_acquisition: [res[0].date_acquisition, Validators.required],
            type_book: [res[0].type_book, Validators.required],
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
      this.uiService.showSnackbar(error.error.message, null, {duration: 3000});
      this.form.resetForm();
    }
  }

  voltar(): void {
    this.backOptions.emit();
  }

}
