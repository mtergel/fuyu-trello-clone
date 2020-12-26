import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addList,
  deleteList,
  changeTitle,
  addCardToList,
  deleteCardFromList,
  moveCard,
} from "./reducer";
import { nanoid } from "@reduxjs/toolkit";
import { useBoard } from "../board/useBoard";

export const useList = (listId: string | null) => {
  const listById = useSelector((state: AppState) => state.listById);
  const dispatch = useDispatch();
  const { AddListToBoard, DeleteListFromBoard } = useBoard();
  const list = listId ? listById[listId] : null;

  const AddList = (listTitle: string, listCards?: string[]) => {
    const newListId = nanoid();
    // const { cardById, AddCard } = useCard(null, newListId);
    // if (listCards && listId) {
    //   listCards.forEach((item) => {
    //     const cardTitle = cardById[item].title;
    //     AddCard(newListId, cardTitle);
    //   });
    // }
    dispatch(addList(newListId, listTitle, listCards)); // Create new list
    AddListToBoard(newListId); // Add created list to board
  };

  const DeleteList = (listId: string) => {
    dispatch(deleteList(listId)); // delete list object
    DeleteListFromBoard(listId); // delete from board array
  };

  const ChangeTitle = (listId: string, listTitle: string) => {
    console.log(listId, listTitle);
    dispatch(changeTitle(listId, listTitle));
  };

  const AddCardToList = (listId: string, cardId: string) => {
    dispatch(addCardToList(listId, cardId));
  };

  const DeleteCardFromList = (listId: string, cardId: string) => {
    dispatch(deleteCardFromList(listId, cardId));
  };

  const MoveCard = (
    oldCardIndex: number,
    newCardIndex: number,
    sourceListId: string,
    newListId: string
  ) => {
    dispatch(moveCard(oldCardIndex, newCardIndex, sourceListId, newListId));
  };

  return {
    list,
    AddList,
    DeleteList,
    ChangeTitle,
    AddCardToList,
    DeleteCardFromList,
    MoveCard,
  };
};
