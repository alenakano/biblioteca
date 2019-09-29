import express, { Application } from 'express';



export class App {

    // Tipo Application para declarar express
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('RODANDO na porta', this.app.get('port'));
    }
}