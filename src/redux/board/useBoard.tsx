import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addList,
  deleteList,
  moveList,
  changeBackground,
  changeTitle,
} from "./reducer";

export const useBoard = () => {
  const board = useSelector((state: AppState) => state.board);
  const dispatch = useDispatch();

  const AddListToBoard = (listId: string) => {
    dispatch(addList(listId));
  };

  const DeleteListFromBoard = (listId: string) => {
    dispatch(deleteList(listId));
  };

  const MoveList = (oldListIndex: number, newListIndex: number) => {
    dispatch(moveList(oldListIndex, newListIndex));
  };

  const ChangeBackground = (newBackgroundImage: string) => {
    dispatch(changeBackground(newBackgroundImage));
  };

  const ChangeTitle = (newtitle: string) => {
    dispatch(changeTitle(newtitle));
  };

  return {
    board,
    AddListToBoard,
    DeleteListFromBoard,
    MoveList,
    ChangeBackground,
    ChangeTitle,
  };
};
