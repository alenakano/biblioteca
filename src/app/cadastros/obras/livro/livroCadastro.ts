import { Moment } from 'moment';

export interface LivroCadastro {
    isbn: string;
    title: string;
    author: string;
    location: string;
    date_acquisition: string;
    type_book: string;
    country: string;
    qtd: number;
    description: string;
}
