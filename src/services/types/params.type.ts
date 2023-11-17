export interface IPage {
  page: number;
  pageSize?: number;
}

export interface ISearch {
  query?: string | null;
}

export interface IFeedParams extends IPage, ISearch {
  authors: string;
  sources: string;
  categories: string;
}
