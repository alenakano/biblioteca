import express, { Application } from 'express';
import morgan from 'morgan';
import errorMiddleware from './middleware/errorsMiddleware';
import cors from 'cors';

// Declaração das rotas no INDEX.ROUTES
import IndexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';
import LivrosRoutes from './routes/livros.routes';
import PeriodicosRoutes from './routes/periodicos.routes';
import MidiasRoutes from './routes/midias.routes';
import ObrasRoutes from './routes/obras.routes';
import OutrasRoutes from './routes/outras.routes';
import UsuariosRoutes from './routes/usuarios.routes';
import BloqueioRoutes from './routes/bloqueio.routes';


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
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(errorMiddleware);
    }

    public routes() {
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostRoutes);
        this.app.use('/livros', LivrosRoutes);
        this.app.use('/periodicos', PeriodicosRoutes);
        this.app.use('/midias', MidiasRoutes);
        this.app.use('/outras', OutrasRoutes);
        this.app.use('/usuarios', UsuariosRoutes);
        this.app.use('/bloqueios', BloqueioRoutes);
        this.app.use('/obras', ObrasRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('RODANDO na porta', this.app.get('port'));
    }
}