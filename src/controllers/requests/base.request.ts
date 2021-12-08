export class BaseRequest<T> {
  constructor(params: Partial<T> = {}) {
    Object.assign(this, params);
  }
}
