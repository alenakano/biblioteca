export class UsuariosCadastro {
    id: string;
    name: string;
    cpf: string;
    address: string;
    complement: string;
    birthdate: Date;
    email: string;
    city: string;
    blocked: boolean;
    date_block: Date;
    date_unblock: Date;

    clearUser(): void {
        this.id = null;
        this.name = null;
        this.cpf = null;
        this.address = null;
        this.complement = null;
        this.birthdate = null;
        this.email = null;
        this.city = null;
        this.blocked = false;
        this.date_block = null;
        this.date_unblock = null;
    }
}

