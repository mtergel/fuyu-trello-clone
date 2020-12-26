import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCard, deleteCard, deleteCardsFromList } from "./reducer";
import { nanoid } from "@reduxjs/toolkit";
import { useList } from "../list/useList";

export const useCard = (cardId: string | null, listId: string | null) => {
  const cardById = useSelector((state: AppState) => state.cardById);
  const dispatch = useDispatch();
  const card = cardId ? cardById[cardId] : null;
  const { AddCardToList, DeleteCardFromList } = useList(listId);

  const AddCard = (listId: string, cardTitle: string) => {
    const newCardId = nanoid();
    dispatch(addCard(newCardId, cardTitle));
    AddCardToList(listId, newCardId);
  };

  const DeleteCard = (listId: string, cardId: string) => {
    dispatch(deleteCard(cardId));
    DeleteCardFromList(listId, cardId);
  };
  const DeleteBatchCards = (cardIds: string[]) => {
    dispatch(deleteCardsFromList(cardIds));
  };

  return {
    cardById,
    card,
    AddCard,
    DeleteCard,
    DeleteBatchCards,
  };
};
