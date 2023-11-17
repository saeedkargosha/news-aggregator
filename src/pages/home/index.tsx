import { Fragment, useEffect, useMemo } from "react";
import { classNameFactory } from "@/utils/dom";
import { ApiService } from "@/services/news-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Article, Header, Searchbar } from "@/components";
import { Button, Loading } from "@/uikit";

import "./home.scss";
import { useSearchParams } from "react-router-dom";

const cn = classNameFactory("home-page");

export default function HomePage() {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();

  const query = useMemo(() => {
    const q = searchParams.get("query");
    return q;
  }, [searchParams]);

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["articles", query],
    queryFn: async ({ pageParam }) => {
      const res = await ApiService.getAllFeeds({ page: pageParam, query });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      Math.ceil(lastPage.totalResults / 20) > allPages.length ? allPages.length + 1 : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isLoading = status === "pending";

  return (
    <div className={cn("")}>
      <div className={cn("container")}>
        <Header />
        <Searchbar />
        {isLoading ? (
          <Loading />
        ) : (
          <ul className={cn("articles")}>
            {data?.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.articles?.map(article => (
                  <Article key={article.title} data={article} />
                ))}
              </Fragment>
            ))}

            {isFetchingNextPage ? (
              "Loading more..."
            ) : hasNextPage ? (
              <Button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                "Load Newer"
              </Button>
            ) : (
              "Nothing more to load"
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
