import { CustomError } from '../lib/CustomError';

export class ApiError extends CustomError {
  status: number;
  statusText: string;
  errorMessage: string;

  constructor(message: string, status: number, statusText: string) {
    super(`HTTP ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.errorMessage = message;
  }
}
