export class HttpException extends Error {
  constructor(
    public readonly message = 'Internal server error',
    public readonly statusCode = 500,
  ) {
    super(message);
  }
}
