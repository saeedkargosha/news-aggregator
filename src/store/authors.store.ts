import { IAuthor } from "@/services/types/author.type";
import { Store } from "@/utils/create-store.util";

// --------------------------------------------------------------------------------
// AUTHORS STORE
// --------------------------------------------------------------------------------
export const useAuthorsStore = new Store<IAuthor[]>({})
  .withPersist({
    name: "AUTHORS_STORE",
  })
  .withDevTools()
  .build();

// --------------------------------------------------------------------------------
// AUTHORS STORE SELECTORS
// --------------------------------------------------------------------------------

export const authorsSelector = (state: IAuthor[]) => Object.values(state);

export const authorIdsSelector = (state: IAuthor[]) => {
  const authors = Object.values(state);
  return authors.map(author => author.value).join(",");
};

// --------------------------------------------------------------------------------
// AUTHORS STORE API
// --------------------------------------------------------------------------------
export const authorsStore = {
  setAuthors: (authors: IAuthor[], replace = true) => useAuthorsStore.setState(authors, replace),
  deleteAuthors: () => useAuthorsStore.setState([], true),
};
