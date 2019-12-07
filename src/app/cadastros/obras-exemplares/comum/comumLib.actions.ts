import { Action } from '@ngrx/store';
import { CategoriaComum } from './categoriaComum';

export const SET_CATEGORIAS_COMUM = '[Categoria] Set Categorias Comum';

// Essa é a forma de fazer uma action com payload
export class SetCategoriasLivro implements Action {
    readonly type = SET_CATEGORIAS_COMUM;

    constructor(public payload: CategoriaComum[]) { }
}

export type ComumLibActions = SetCategoriasLivro;
