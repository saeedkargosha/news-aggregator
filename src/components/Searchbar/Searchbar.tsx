import { TextField } from "@/uikit";
import { classNameFactory } from "@/utils/dom";
import { useSearchParams } from "react-router-dom";
import "./Searchbar.scss";
import { useDebounce } from "@/hooks/useDebounce";

const cn = classNameFactory("search-bar");

export const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query) return setSearchParams({ query });
    setSearchParams(query);
  }, 300);

  const query = searchParams.get("query") ?? undefined;

  return (
    <div className={cn("")}>
      <TextField defaultValue={query} placeholder="search..." onChange={handleChange} />
    </div>
  );
};
