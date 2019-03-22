export class ORMError extends Error {
  public code: number
  constructor(public message: string) {
    super(message)
    this.code = 400
  }
}
