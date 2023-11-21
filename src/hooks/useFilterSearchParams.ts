import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export const useFilterSearchParams = (query: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mutate = useDebounce((value: string) => {
    if (value) {
      searchParams.set(query, value);
    } else {
      searchParams.delete(query);
    }
    return setSearchParams(searchParams);
  }, 300);

  const params = searchParams.get(query) ?? undefined;

  return [params, mutate] as const;
};
