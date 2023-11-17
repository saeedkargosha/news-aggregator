import { FC } from "react";
import { IArticle } from "@/services/types/article.type";
import { classNameFactory } from "@/utils/dom";
import parse from "html-react-parser";

import "./Article.scss";

const cn = classNameFactory("article");

interface ArticleProps {
  data: IArticle;
}

export const Article: FC<ArticleProps> = ({ data }) => {
  return (
    <li>
      <div className={cn("")}>
        <img className={cn("cover")} src={data.urlToImage} />
        <div>
          <p className={cn("title")}>{data.title}</p>
          <p className={cn("description")}>{data.content ? parse(data.content) : ""}</p>
        </div>
      </div>
    </li>
  );
};
