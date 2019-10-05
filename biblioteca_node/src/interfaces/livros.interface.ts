export interface Livros {
    id: string;
    isbn: string;
    category: '1';
    title: string;
    author: string;
    location: string;
    date_acquisition: Date;
    type_book: string;
    country: string;
    description?: string;
}
