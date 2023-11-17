import configs from "@/configs";
import axios, { CreateAxiosDefaults } from "axios";
import { IArticle } from "./types/article.type";
import { IResponse } from "./types/response.type";
import { IPage, ISearch } from "./types/params.type";

const newsAxiosInstance = axios.create({
  baseURL: configs.app.url,
} as CreateAxiosDefaults);

function getUrl(path: string, params: { [key: string]: string | number | null | undefined }) {
  const newParams = Object.keys(params).reduce(
    (acc, key) => (params[key] === undefined || params[key] === null ? { ...acc } : { ...acc, [key]: params[key] }),
    {}
  );

  const searchParams = new URLSearchParams({
    apiKey: configs.app.apiKey,
    sources: configs.app.sources,
    ...newParams,
  });

  const query = searchParams.toString();
  return `${path}?${query}`;
}

const getAllFeeds = ({ page, pageSize = 20, query }: IPage & ISearch) => {
  return newsAxiosInstance
    .get<IResponse<IArticle[]>>(getUrl("/everything", { page, pageSize, q: query }))
    .then(res => res.data);
};

export const ApiService = {
  getAllFeeds,
};
