export type ResponseStatus = "ok";

export interface IResponse<T> {
  status: ResponseStatus;
  totalResults: number;
  articles: T;
}
