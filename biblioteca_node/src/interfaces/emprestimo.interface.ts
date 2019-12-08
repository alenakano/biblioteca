export interface Emprestimo {
    idEmprestimo: string;
    idUsuario: number;
    idExemplar: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataPrevisao: Date;
    status: number;
}
