import * as fromRoot from '../../../app.reducer';
import { CategoriaLivros } from './categoriaLivros';
import { LivroActions, SET_CATEGORIAS_LIVRO } from './livro.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface CategoriaState {
    categorias: CategoriaLivros[];
}

// Precisamos extender do root state para nos precaver do lazy load
export interface State extends fromRoot.State {
    categoriasLivros: CategoriaState;
}


const initialState: CategoriaState = {
    categorias: []
};

export function livroReducer(state = initialState, action: LivroActions) {
    switch (action.type) {
        case SET_CATEGORIAS_LIVRO:
            return {
                /** caso tivesse outros objetos na interface, não perderia eles ao preencher o payload da categoria livros */
                ...state,
                categorias: action.payload
            };
        default: {
            return state;
        }
    }
}

// Esse state livro é o mesmo que indicamos no cadastro.module.
export const getCategoriaState = createFeatureSelector<CategoriaState>('categoria');

export const getCategoriasLivro = createSelector(getCategoriaState, (state: CategoriaState) => state.categorias);
