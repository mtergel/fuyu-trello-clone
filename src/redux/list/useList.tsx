import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addList, deleteList } from "./reducer";
import { nanoid } from "@reduxjs/toolkit";
import { useBoard } from "../board/useBoard";

export const useList = (listId: string | null) => {
  const listById = useSelector((state: AppState) => state.listById);
  const dispatch = useDispatch();
  const { AddListToBoard, DeleteListFromBoard } = useBoard();
  const list = listId ? listById[listId] : null;

  const AddList = (listTitle: string) => {
    const newListId = nanoid();
    dispatch(addList(newListId, listTitle)); // Create new list
    AddListToBoard(newListId); // Add created list to board
  };

  const DeleteList = (listId: string) => {
    dispatch(deleteList(listId)); // delete list object
    DeleteListFromBoard(listId); // delete from board array
  };

  return {
    list,
    AddList,
    DeleteList,
  };
};
