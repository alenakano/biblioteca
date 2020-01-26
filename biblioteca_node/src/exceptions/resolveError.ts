import { Response } from 'express';


export function resolveError(error: any, res: Response) {
    switch (error.errno) {
        case 1062: {
            res.status(412).json({
                message: 'Já cadastrado, tente novamente'
            });
            break;
        }
        default: {
            res.status(400).json({
                message: 'Problemas de comunicação. Tente mais tarde.'
            });
            break;
        }
    }
}
