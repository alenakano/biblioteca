import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';


import { CategoriaLivros } from './CategoriaLivros';
import { ExemplarCadastro } from './exemplarCadastro';
import { Isbn } from './isbn';
import { LivroService } from './livro.service';
import { ObraCadastro } from './obraCadastro';
import { UIService } from 'src/app/util/ui.service';
import * as fromCategoria from './livro.reducer';


@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit, OnDestroy {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('ngForm', null) form;
  @ViewChild('isbnForm', null) isbnForm;
  @ViewChild('exemplarForm', null) exemplarForm;

  livrosCategoria$: Observable<CategoriaLivros[]>;

  public obraCadastro: ObraCadastro = new ObraCadastro();
  public exemplarCadastro: ExemplarCadastro = new ExemplarCadastro();
  public isbn: Isbn = new Isbn();
  public grupoID: FormGroup;
  public grupoExemplar: FormGroup;
  public grupoObra: FormGroup;
  public updateObra = false;
  public hideISBN = false;
  public hideObra = true;
  public hideExemplar = true;


  cadastroSubscription: Subscription;
  updateSubscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private store: Store<fromCategoria.State>,
    private uiService: UIService,
  ) {

    this.grupoID = this.fb.group({
      isbnID: [null, Validators.required],
    });

    this.grupoObra = this.fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      type_book: [null, Validators.required],
      country: [null, Validators.required],
      description: [null, null],
    });

    this.grupoExemplar = this.fb.group({
      isbn: [null, null],
      title: [null, null],
      author: [null, null],
      location: [null, Validators.required],
      date_acquisition: [null, Validators.required],
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
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) {
      return  o1.id === o2.id;
    }
  }

  onFormISBNSubmit(cad: Form | any) {
    this.isbn.isbn = cad.isbnID;
    this.cadastroSubscription = this.livroService.consultaISBN(this.isbn).subscribe(
      res => {
        this.updateObra = true;
        this.hideObra = false;
        this.obraCadastro = res[0];
        this.grupoExemplar = this.fb.group({
          isbn: [{value: this.isbn.isbn, disabled: true}, null],
          title: [{value: res[0].title, disabled: true}, null],
          author: [{value: res[0].author, disabled: true}, null],
          location: [null, Validators.required],
          date_acquisition: [null, Validators.required],
        });
      },
      error => this.onServiceISBNError(error)
    );
  }

  onFormExemplarSubmit(cad: Form | any) {
    this.exemplarCadastro = cad;
    this.exemplarCadastro.isbn = this.isbn.isbn;

    this.cadastroSubscription = this.livroService.cadastrarExemplar(this.exemplarCadastro).subscribe(
      res => {
        this.uiService.showSnackbar(res.message, null, {duration: 3000});
        this.voltar();
      },
      error => this.onServiceCreateError2(error)
    );
  }

  onFormObrasSubmit(cad: Form | any) {
    this.obraCadastro = cad;
    this.obraCadastro.isbn = this.isbn.isbn;

    if (this.updateObra) {
      this.cadastroSubscription = this.livroService.cadastrarObra(this.obraCadastro).subscribe(
        msg => {
          this.uiService.showSnackbar(msg.message, null, {duration: 3000});
          this.grupoExemplar = this.fb.group({
            isbn: [{value: this.obraCadastro.isbn, disabled: true}, null],
            title: [{value: this.obraCadastro.title, disabled: true}, null],
            author: [{value: this.obraCadastro.author, disabled: true}, null],
            location: [null, Validators.required],
            date_acquisition: [null, Validators.required],
          });
          this.onStepExemplar();
        },
        error => this.onServiceCreateError(error)
      );
    } else {
      this.cadastroSubscription = this.livroService.atualizarObra(this.obraCadastro).subscribe(
        msg => {
          this.uiService.showSnackbar(msg.message, null, {duration: 3000});
          this.updateObra = true;
          this.grupoExemplar = this.fb.group({
            isbn: [{value: this.obraCadastro.isbn, disabled: true}, null],
            title: [{value: this.obraCadastro.title, disabled: true}, null],
            author: [{value: this.obraCadastro.author, disabled: true}, null],
            location: [null, Validators.required],
            date_acquisition: [null, Validators.required],
          });
          this.onStepExemplar();
        },
        error => this.onServiceCreateError(error)
      );
    }
  }

  public onServiceCreateError(error) {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      if (this.form) {
        this.form.resetForm();
      }
      if (this.hideExemplar) {
        this.exemplarForm.resetForm();
      }
  }

  public onServiceCreateError2(error) {

    this.uiService.showSnackbar(error.message, null, {duration: 3000});
    this.voltar();
  }


  public onServiceISBNError(res) {
    if (res.status === 412) {
      this.hideISBN = true;
      this.hideObra = false;
      this.updateObra = false;
      this.uiService.showSnackbar('Obra não cadastrada. Por favor, insira os dados da obra e exemplar.', null, {duration: 3000});
      this.obraCadastro.isbn = this.isbn.isbn;
      this.grupoObra = this.fb.group({
        title: [null , Validators.required],
        type_book: [null, Validators.required],
        author: [null, Validators.required],
        country: [null, Validators.required],
        description: [null, null],
      });
    } else {
      this.uiService.showSnackbar('Erro de conexão. Por favor, tente mais tarde', null, {duration: 3000});
      this.hideISBN = false;
      this.hideExemplar = true;
      this.hideObra = true;
    }
  }

  onStepExemplar(): void {
    this.hideISBN = true;
    this.hideExemplar = false;
    this.hideObra = true;
  }

  voltar(): void {
    this.backOptions.emit();
  }

  onVoltarExemplar(): void {
    this.hideISBN = true;
    this.hideExemplar = true;
    this.hideObra = false;
  }
  onVoltarObra(): void {
    this.hideISBN = false;
    this.hideExemplar = true;
    this.hideObra = true;
  }

}
