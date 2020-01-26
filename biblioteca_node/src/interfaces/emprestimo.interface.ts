export interface Emprestimo {
    idEmprestimo: string;
    identificador: string;
    idUsuario: number;
    idExemplar: number;
    idObra: number;
    numExemplar: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataPrevisao: Date;
    status: number;
}
