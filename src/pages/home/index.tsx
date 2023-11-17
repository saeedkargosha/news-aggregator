import { Fragment, useEffect } from "react";
import { classNameFactory } from "@/utils/dom";
import { ApiService } from "@/services/news-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Article, Header } from "@/components";
import { Button, Loading } from "@/uikit";

import "./home.scss";

const cn = classNameFactory("home-page");

export default function HomePage() {
  const { ref, inView } = useInView();
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam }) => {
      const res = await ApiService.getAllFeeds({ page: pageParam });
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
            <Button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load Newer" : "Nothing more to load"}
            </Button>
          </ul>
        )}
      </div>
    </div>
  );
}
