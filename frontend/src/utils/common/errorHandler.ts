import { toast, TypeOptions } from 'react-toastify';

export class ErrorHandler {
  handle(msg: string, type: TypeOptions = 'error') {
    toast(msg, { type, theme: 'colored' });
  }
}

export default ErrorHandler;
