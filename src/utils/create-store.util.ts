import { create, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { StateCreator, StoreApi, StateListener, StateSelector, EqualityChecker } from "zustand";
import type { PersistOptions } from "zustand/middleware";

interface ISliceSubscription {
  unsubscribe: () => void;
}

interface IStoreApi<TState extends object> extends StoreApi<TState> {
  /**
   * It subscribes to the store, and calls the listener with the selected state slice whenever the
   * selected state slice changes
   * @param selector - A function that takes the state and returns a slice of it.
   * @param listener - The function that will be called when the selected state slice changes.
   * @param [options]
   * -
   * - equalityFn - An optional function that takes two parameters and returns true if they are equal.
   * - fireImmediately - It will execute the lister Fn immediately after first subscribe by setting it true.
   * @return unsubscribe method
   */
  sliceSubscribe: <TSlice>(
    selector: StateSelector<TState, TSlice>,
    listener: StateListener<TSlice | undefined>,
    options?: { equalityFn?: EqualityChecker<TSlice>; fireImmediately?: boolean }
  ) => ISliceSubscription;
}

interface IPersistOptions<TState> extends PersistOptions<TState, Partial<TState>> {
  /**
   * Set this to `false` to disable persist when the store is built.
   * @default `true`.
   */
  enabled?: boolean;
}

export class Store<TState extends object> {
  private createState: StateCreator<TState, any, any, TState>;

  constructor(initial: any) {
    this.createState = () => initial;
    return this;
  }

  withDevTools() {
    this.createState = devtools(this.createState, { enabled: false });
    return this;
  }

  withPersist(baseOptions: IPersistOptions<TState>): Store<TState> {
    if (baseOptions.enabled === false) {
      return this;
    }

    this.createState = persist(this.createState, {
      ...baseOptions,
    });

    return this;
  }

  build() {
    const store = create(this.createState) as UseBoundStore<IStoreApi<TState>>;

    store.sliceSubscribe = (selector, listener, options?) => {
      if (options?.fireImmediately) {
        const selectedStateSlice = selector(store.getState());
        listener(selectedStateSlice, undefined);
      }

      const unsubscribe = store.subscribe((state, previousState) => {
        const currentSelectedStateSlice = selector(state);
        const previousSelectedStateSlice = selector(previousState);
        const isEqual = options?.equalityFn || Object.is;

        if (!isEqual(currentSelectedStateSlice, previousSelectedStateSlice)) {
          listener(currentSelectedStateSlice, previousSelectedStateSlice);
        }
      });

      return { unsubscribe };
    };

    return store;
  }
}
