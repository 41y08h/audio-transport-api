export default class HandlerContextError extends Error {
  status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HandlerContextError";
    this.status = status || 400;
  }
}
