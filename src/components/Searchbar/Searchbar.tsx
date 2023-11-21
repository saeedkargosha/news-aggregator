import { TextField } from "@/uikit";
import { classNameFactory } from "@/utils/dom";
import { useFilterSearchParams } from "@/hooks/useFilterSearchParams";
import "./Searchbar.scss";

const cn = classNameFactory("searchbar");

export const Searchbar = () => {
  const [query, setQuery] = useFilterSearchParams("query");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div className={cn("")}>
      <TextField defaultValue={query} placeholder="search..." onChange={handleChange} />
    </div>
  );
};
