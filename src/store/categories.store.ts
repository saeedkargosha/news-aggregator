import { ICategory } from "@/services/types/category.type";
import { Store } from "@/utils/create-store.util";

// --------------------------------------------------------------------------------
// CATEGORIES STORE
// --------------------------------------------------------------------------------
export const useCategoriesStore = new Store<ICategory[]>({})
  .withPersist({
    name: "CATEGORIES_STORE",
  })
  .withDevTools()
  .build();

// --------------------------------------------------------------------------------
// CATEGORIES STORE SELECTORS
// --------------------------------------------------------------------------------

export const categoriesSelector = (state: ICategory[]) => Object.values(state);

export const categoriesIdsSelector = (state: ICategory[]) => {
  const categories = Object.values(state);
  return categories.map(category => category.value).join(",");
};

// --------------------------------------------------------------------------------
// CATEGORIES STORE API
// --------------------------------------------------------------------------------
export const categoriesStore = {
  setCategories: (categories: ICategory[], replace = true) => useCategoriesStore.setState(categories, replace),
  deleteCategories: () => useCategoriesStore.setState([], true),
  getCategories: () => categoriesSelector(useCategoriesStore.getState()),
};
