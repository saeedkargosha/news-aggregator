import { IResponseStatus } from "./response.type";

export interface ISource {
  id: string;
  name: string;
  category: string;
  country: string;
  description: string;
  language: string;
  url: string;
}

export interface ISourceResponse extends IResponseStatus {
  sources: ISource[];
}
