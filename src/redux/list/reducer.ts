import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { stringify } from "querystring";

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
        action: PayloadAction<{
          listId: string;
          listTitle: string;
          listCards?: string[];
        }>
      ) => {
        return {
          ...state,
          [action.payload.listId]: {
            _id: action.payload.listId,
            title: action.payload.listTitle,
            cards: action.payload.listCards || [],
          },
        };
      },
      prepare: (listId: string, listTitle: string, listCards?: string[]) => {
        return {
          payload: {
            listId,
            listTitle,
            listCards,
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
    changeTitle: {
      reducer: (
        state,
        action: PayloadAction<{ listId: string; listTitle: string }>
      ) => {
        state[action.payload.listId].title = action.payload.listTitle;
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
    addCardToList: {
      reducer: (
        state,
        action: PayloadAction<{ listId: string; cardId: string }>
      ) => {
        state[action.payload.listId].cards?.push(action.payload.cardId);
      },
      prepare: (listId: string, cardId: string) => {
        return {
          payload: {
            listId,
            cardId,
          },
        };
      },
    },
    deleteCardFromList: {
      reducer: (
        state,
        action: PayloadAction<{ listId: string; cardId: string }>
      ) => {
        state[action.payload.listId].cards?.filter(
          (item) => item !== action.payload.cardId
        );
      },
      prepare: (listId: string, cardId: string) => {
        return {
          payload: {
            listId,
            cardId,
          },
        };
      },
    },
    moveCard: {
      reducer: (
        state,
        action: PayloadAction<{
          oldCardIndex: number;
          newCardIndex: number;
          sourceListId: string;
          newListId: string;
        }>
      ) => {
        const {
          sourceListId,
          newCardIndex,
          newListId,
          oldCardIndex,
        } = action.payload;
        if (sourceListId === newListId) {
          const newCards = Array.from(state[sourceListId].cards || []);
          const [removedCard] = newCards.splice(oldCardIndex, 1);
          newCards.splice(newCardIndex, 0, removedCard);
          return {
            ...state,
            [sourceListId]: { ...state[sourceListId], cards: newCards },
          };
        } else {
          const sourceCards = Array.from(state[sourceListId].cards || []);
          const [removedCard] = sourceCards.splice(oldCardIndex, 1);
          const destinationCards = Array.from(state[newListId].cards || []);
          destinationCards.splice(newCardIndex, 0, removedCard);
          return {
            ...state,
            [sourceListId]: { ...state[sourceListId], cards: sourceCards },
            [newListId]: { ...state[newListId], cards: destinationCards },
          };
        }
      },
      prepare: (
        oldCardIndex: number,
        newCardIndex: number,
        sourceListId: string,
        newListId: string
      ) => {
        return {
          payload: {
            oldCardIndex,
            newCardIndex,
            sourceListId,
            newListId,
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
  changeTitle,
  addCardToList,
  deleteCardFromList,
  moveCard,
} = listSlice.actions;

// export reducer
export default listSlice.reducer;
