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
  },
});

// export actions
export const { addCard } = cardSlice.actions;

// export reducer
export default cardSlice.reducer;
