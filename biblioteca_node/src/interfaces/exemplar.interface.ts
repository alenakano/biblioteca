export interface Exemplar {
    idExemplar: number;
    idObra: number;
    numExemplar: number;
    local: string;
    dataAquisicao: Date;
    dataCadastro: Date;
    tomo?: string;
    status: number;
}
