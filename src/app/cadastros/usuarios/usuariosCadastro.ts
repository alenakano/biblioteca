export class UsuariosCadastro {
    idUsuario: string;
    nomeUsuario: string;
    CPF: string;
    endereco: string;
    complemento: string;
    dataNascimento: Date;
    email: string;
    cidade: string;
    status = 0;
    dataBloqueio?: Date;
    dataDesbloqueio?: Date;

    clearUser(): void {
        this.idUsuario = null;
        this.nomeUsuario = null;
        this.CPF = null;
        this.endereco = null;
        this.complemento = null;
        this.dataNascimento = null;
        this.email = null;
        this.cidade = null;
        this.status = 0;
        this.dataBloqueio = null;
        this.dataDesbloqueio = null;
    }
}

