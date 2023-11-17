import { IResponseStatus } from "./response.type";
import { ISource } from "./source.type";

export interface IArticle {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleResponse extends IResponseStatus {
  totalResults: number;
  articles: IArticle[];
}
