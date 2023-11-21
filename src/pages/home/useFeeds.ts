import { useFilterSearchParams } from "@/hooks/useFilterSearchParams";
import { ApiService } from "@/services/news-api";
import { authorIdsSelector, useAuthorsStore } from "@/store/authors.store";
import { categoriesIdsSelector, useCategoriesStore } from "@/store/categories.store";
import { sourceIdsSelector, useSourcesStore } from "@/store/sources.store";
import { mergeStrings } from "@/utils/merge";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFeeds = () => {
  const [query] = useFilterSearchParams("query");
  const [categories] = useFilterSearchParams("categories");
  const [sources] = useFilterSearchParams("sources");

  const selectedAuthorIds = useAuthorsStore(authorIdsSelector);
  const selectedSourcesIds = useSourcesStore(sourceIdsSelector);
  const selectedCategoriesIds = useCategoriesStore(categoriesIdsSelector);

  return useInfiniteQuery({
    queryKey: ["articles", query, selectedAuthorIds, selectedSourcesIds, selectedCategoriesIds, sources, categories],
    queryFn: async ({ pageParam }) => {
      const res = await ApiService.getFeeds({
        page: pageParam,
        query,
        authors: selectedAuthorIds,
        sources: mergeStrings(selectedSourcesIds, sources),
        categories: mergeStrings(selectedCategoriesIds, categories),
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      Math.ceil(lastPage.totalResults / 20) > allPages.length ? allPages.length + 1 : undefined,
  });
};
