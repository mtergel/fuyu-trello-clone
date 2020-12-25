import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface List {
  _id: string;
  title: string;
  cards?: string[];
}
// Dictionary-like
export interface Lists {
  [id: string]: List;
}
const initState = {} as Lists;

const listSlice = createSlice({
  name: "listById",
  initialState: initState,
  reducers: {
    addList: {
      reducer: (
        state,
        action: PayloadAction<{ listId: string; listTitle: string }>
      ) => {
        return {
          ...state,
          [action.payload.listId]: {
            _id: action.payload.listId,
            title: action.payload.listTitle,
          },
        };
      },
      prepare: (listId: string, listTitle: string) => {
        return {
          payload: {
            listId,
            listTitle,
          },
        };
      },
    },
    deleteList: {
      reducer: (state, action: PayloadAction<{ listId: string }>) => {
        return {
          ..._.omit(state, action.payload.listId),
        };
      },
      prepare: (listId: string) => {
        return {
          payload: {
            listId,
          },
        };
      },
    },
  },
});

// export actions
export const { addList, deleteList } = listSlice.actions;

// export reducer
export default listSlice.reducer;
