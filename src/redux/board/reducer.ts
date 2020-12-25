import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ------------------------------- board type ------------------------------- */
export interface Board {
  lists: string[]; // array of id
  backgroundImage: string | null;
  title: string | null;
}

/* ------------------------------ board reducer ----------------------------- */
const initState = {
  lists: [],
  title: "Your board",
  backgroundImage:
    "https://unsplash.com/photos/E_eWwM29wfU/download?force=true&w=2400",
} as Board;
const boardSlice = createSlice({
  name: "board",
  initialState: initState,
  reducers: {
    addList: {
      reducer: (state, action: PayloadAction<{ listId: string }>) => {
        state.lists?.push(action.payload.listId);
      },
      prepare: (listId: string) => {
        return {
          payload: { listId },
        };
      },
    },
    deleteList: {
      reducer: (state, action: PayloadAction<{ listId: string }>) => {
        state.lists = state.lists.filter(
          (item) => item !== action.payload.listId
        );
      },
      prepare: (listId: string) => {
        return {
          payload: { listId },
        };
      },
    },
    moveList: {
      reducer: (
        state,
        action: PayloadAction<{ oldListIndex: number; newListIndex: number }>
      ) => {
        // [
        //   state.lists[action.payload.oldListIndex],
        //   state.lists[action.payload.newListIndex],
        // ] = [
        //   state.lists[action.payload.newListIndex],
        //   state.lists[action.payload.oldListIndex],
        // ];
        const newLists = Array.from(state.lists);
        const [removedList] = newLists.splice(action.payload.oldListIndex, 1);
        newLists.splice(action.payload.newListIndex, 0, removedList);
        return {
          ...state,
          lists: newLists,
        };
      },
      prepare: (oldListIndex: number, newListIndex: number) => {
        return {
          payload: { oldListIndex, newListIndex },
        };
      },
    },
    changeBackground: {
      reducer: (
        state,
        action: PayloadAction<{ newBackgroundImage: string }>
      ) => {
        state.backgroundImage = action.payload.newBackgroundImage;
      },
      prepare: (newBackgroundImage: string) => {
        return {
          payload: {
            newBackgroundImage,
          },
        };
      },
    },
    changeTitle: {
      reducer: (state, action: PayloadAction<{ newTitle: string }>) => {
        state.title = action.payload.newTitle;
      },
      prepare: (newTitle: string) => {
        return {
          payload: {
            newTitle,
          },
        };
      },
    },
  },
});

// export actions
export const {
  addList,
  deleteList,
  moveList,
  changeBackground,
  changeTitle,
} = boardSlice.actions;

// export reducer
export default boardSlice.reducer;
