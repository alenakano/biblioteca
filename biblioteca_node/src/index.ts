import { App } from './app';

// main inicializa o programa
async function main() {
    // Posso mandar a porta para a classe index.ts, pois está no constructor do app.ts
    const app = new App();
    await app.listen();
}

// para rodar o servidor acima
main();
