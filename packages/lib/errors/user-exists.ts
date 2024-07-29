export class UserExistsError extends Error {
  constructor() {
    super('El usuario ya existe');
  }
}
