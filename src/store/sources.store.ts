import { ISource } from "@/services/types/source.type";
import { Store } from "@/utils/create-store.util";

// --------------------------------------------------------------------------------
// SOURCE STORE
// --------------------------------------------------------------------------------
export const useSourcesStore = new Store<ISource[]>({})
  .withPersist({
    name: "SOURCES_STORE",
  })
  .withDevTools()
  .build();

// --------------------------------------------------------------------------------
// SOURCES STORE SELECTORS
// --------------------------------------------------------------------------------

export const sourcesSelector = (state: ISource[]) => Object.values(state);

export const sourceIdsSelector = (state: ISource[]) => {
  const sources = Object.values(state);
  return sources.map(source => source.id).join(",");
};

// --------------------------------------------------------------------------------
// SOURCES STORE API
// --------------------------------------------------------------------------------
export const sourcesStore = {
  setSources: (sources: ISource[], replace = true) => useSourcesStore.setState(sources, replace),
  deleteSources: () => useSourcesStore.setState([], true),
  getSources: () => sourcesSelector(useSourcesStore.getState()),
};
