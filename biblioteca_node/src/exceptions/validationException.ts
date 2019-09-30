import HttpException from './HttpException';

class ValidationException extends HttpException {
  constructor(id: string) {
    super(412, `Post with id ${id} not found`);
  }
}

export default ValidationException;
