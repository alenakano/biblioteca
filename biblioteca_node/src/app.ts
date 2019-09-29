import express, { Application } from 'express';
import morgan from 'morgan';

// Declaração das rotas no INDEX.ROUTES
import IndexRoutes from './routes/index.routes';

export class App {

    // Tipo Application para declarar express
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    public settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    public middlewares() {
        // logando quando há um requisição
        this.app.use(morgan('dev'));
    }

    public routes() {
        this.app.use(IndexRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('RODANDO na porta', this.app.get('port'));
    }
}