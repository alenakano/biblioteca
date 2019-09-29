import { Action } from '@ngrx/store';
import { CategoriaLivros } from './CategoriaLivros';

export const SET_CATEGORIAS_LIVRO = '[Categoria] Set Categorias Livro';

// Essa é a forma de fazer uma action com payload
export class SetCategoriasLivro implements Action {
    readonly type = SET_CATEGORIAS_LIVRO;

    constructor(public payload: CategoriaLivros[]) { }
}

export type LivroActions = SetCategoriasLivro;
