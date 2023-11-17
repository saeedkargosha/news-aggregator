import configs from "@/configs";
import axios, { CreateAxiosDefaults } from "axios";
import { IArticle } from "./types/article.type";
import { IPage, IResponse } from "./types/response.type";

const newsAxiosInstance = axios.create({
  baseURL: configs.app.url,
} as CreateAxiosDefaults);

function getUrl(path: string, params: { [key: string]: string | number }) {
  const searchParams = new URLSearchParams({
    apiKey: configs.app.apiKey,
    sources: configs.app.sources,
    ...params,
  });

  const query = searchParams.toString();
  return `${path}?${query}`;
}

const getAllFeeds = ({ page, pageSize = 20 }: IPage) => {
  return newsAxiosInstance.get<IResponse<IArticle[]>>(getUrl("/everything", { page, pageSize })).then(res => res.data);
};

export const ApiService = {
  getAllFeeds,
};
