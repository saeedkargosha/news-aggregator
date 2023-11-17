export type ResponseStatus = "ok";

export interface IResponse<T> {
  status: ResponseStatus;
  totalResults: number;
  articles: T;
}

export interface IPage {
  page: number;
  pageSize?: number;
}
