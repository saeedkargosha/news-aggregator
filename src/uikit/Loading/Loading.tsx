import { classNameFactory } from "@/utils/dom";
import "./Loading.scss";

const cn = classNameFactory("loading");

interface LoadingProps {
  isFullScreen?: boolean;
}
export function Loading({ isFullScreen = false }: LoadingProps) {
  return (
    <div className={cn("", { "full-screen": isFullScreen })}>
      <div className={cn("content animate-spin")} role="status" aria-label="loading" />
    </div>
  );
}
