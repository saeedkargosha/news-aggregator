import configs from "@/configs";
import axios, { CreateAxiosDefaults } from "axios";
import { IFeedParams } from "./types/params.type";
import { ISourceResponse } from "./types/source.type";
import { IArticleResponse } from "./types/article.type";
import { setInterceptors } from "@/utils/axiosInterceptors";

const newsAxiosInstance = axios.create({
  baseURL: configs.app.url,
} as CreateAxiosDefaults);

setInterceptors(newsAxiosInstance);

const getFeeds = ({ page, pageSize = 20, query, authors, sources, categories }: IFeedParams) => {
  const authorsParam = authors.length === 0 ? undefined : authors;
  const categoriesParam = categories.length === 0 ? undefined : categories;
  const sourcesParam = sources.length === 0 ? configs.sources.map(source => source.id).join(",") : sources;

  return newsAxiosInstance
    .get<IArticleResponse>("/everything", {
      params: {
        sources: sourcesParam,
        page,
        pageSize,
        q: query,
        authors: authorsParam,
        categories: categoriesParam,
      },
    })
    .then(res => res.data);
};

const getSources = () => {
  return newsAxiosInstance.get<ISourceResponse>(`/top-headlines/sources`).then(res => res.data);
};

export const ApiService = {
  getFeeds,
  getSources,
};
