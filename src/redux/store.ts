import { combineReducers, createStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";
import boardSlice from "./board/reducer";
import listSlice from "./list/reducer";
import cardSlice from "./cards/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";
const rootReducer = combineReducers({
  board: boardSlice,
  listById: listSlice,
  cardById: cardSlice,
});

// Todo type here
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
export const store = createStore(
  rootReducer,
  persistedState,
  devToolsEnhancer({})
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 300)
);

export type AppState = ReturnType<typeof rootReducer>;
