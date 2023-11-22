import { Fragment, useEffect } from "react";
import { classNameFactory } from "@/utils/dom";
import { useInView } from "react-intersection-observer";
import { Article, Filter, Header } from "@/components";
import { Button, Loading } from "@/uikit";
import { useFeeds } from "./useFeeds";

import "./home.scss";

const cn = classNameFactory("home-page");

export default function HomePage() {
  const { ref, inView } = useInView();
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useFeeds();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isLoading = status === "pending";

  return (
    <div className={cn("")} data-testid="home">
      <div className={cn("container")}>
        <Header />
        <Filter />
        {isLoading ? (
          <Loading />
        ) : (
          <ul className={cn("articles")} data-testid="articles">
            {data?.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.articles?.map(article => (
                  <Article key={article.url} data={article} />
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
