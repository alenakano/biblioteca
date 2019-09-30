import express, { Application } from 'express';
import morgan from 'morgan';
import errorMiddleware from './middleware/errorsMiddleware';

// Declaração das rotas no INDEX.ROUTES
import IndexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';


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
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(errorMiddleware);
    }

    public routes() {
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('RODANDO na porta', this.app.get('port'));
    }
}
