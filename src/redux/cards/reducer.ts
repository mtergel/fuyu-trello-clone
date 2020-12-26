import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export interface Card {
  _id: string;
  title: string;
}
// Dictionary-like
export interface Cards {
  [id: string]: Card;
}

const initState = {} as Cards;

const cardSlice = createSlice({
  name: "cardById",
  initialState: initState,
  reducers: {
    addCard: {
      reducer: (
        state,
        action: PayloadAction<{
          cardID: string;
          cardTitle: string;
        }>
      ) => {
        return {
          ...state,
          [action.payload.cardID]: {
            _id: action.payload.cardID,
            title: action.payload.cardTitle,
          },
        };
      },
      prepare: (cardID: string, cardTitle: string) => {
        return {
          payload: {
            cardID,
            cardTitle,
          },
        };
      },
    },
    deleteCard: {
      reducer: (
        state,
        action: PayloadAction<{
          cardId: string;
        }>
      ) => {
        return {
          ..._.omit(state, action.payload.cardId),
        };
      },
      prepare: (cardId: string) => {
        return {
          payload: {
            cardId,
          },
        };
      },
    },
    deleteCardsFromList: {
      reducer: (
        state,
        action: PayloadAction<{
          cardIds: string[];
        }>
      ) => {
        const newObj = Object.keys(state)
          .filter((cardId) => !action.payload.cardIds.includes(cardId))
          .reduce(
            (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
            {}
          );
        return newObj;
      },
      prepare: (cardIds: string[]) => {
        return {
          payload: {
            cardIds,
          },
        };
      },
    },
  },
});

// export actions
export const { addCard, deleteCard, deleteCardsFromList } = cardSlice.actions;

// export reducer
export default cardSlice.reducer;
