export class Usuarios {
    id: string;
    name: string;
    cpf: string;
    address: string;
    complement: string;
    birthdate: Date;
    email: string;
    city: string;
    blocked = false;
    date_block: Date;
    date_unblock: Date;
}
