import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useList } from "../redux/list/useList";
import { FiMoreVertical } from "react-icons/fi";
import CreateCard from "./CreateCard";
import Card from "./Card";
import { useCard } from "../redux/cards/useCard";
interface ListProps {
  listId: string;
  index: number;
}

const List: React.FC<ListProps> = ({ listId, index }) => {
  const { list, DeleteList, ChangeTitle } = useList(listId);
  const { DeleteBatchCards } = useCard(null, listId);
  const handleDelete = () => {
    if (list && list.cards) {
      DeleteBatchCards(list.cards);
    }
    DeleteList(listId);
  };
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const [value, setValue] = useState(list?.title || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setEditMode(false);
        if (value === "") {
          setValue(list?.title || "");
        } else {
          ChangeTitle(listId, value);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    //eslint-disable-next-line
  }, [ref, value]);

  if (list) {
    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <Box
            boxSizing="border-box"
            verticalAlign="top"
            rounded="md"
            width="272px"
            backgroundColor="rgba(26, 32, 44, 0.7)"
            borderRadius={3}
            p={2}
            display="flex"
            flexDir="column"
            maxHeight="100%"
            position="relative"
            boxShadow="lg"
            color="white"
            _notLast={{
              marginRight: 4,
            }}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Flex alignItems="center">
              <Box px={2} width="100%">
                {!editMode ? (
                  <Heading size="sm" onClick={toggleEditMode} width="100%">
                    {list.title}
                  </Heading>
                ) : (
                  <div ref={ref}>
                    <Input
                      value={value}
                      onChange={handleChange}
                      border="none"
                      autoFocus
                    />
                  </div>
                )}
              </Box>
              <Spacer />
              <Box color="white">
                <Menu>
                  <MenuButton as={Button}>
                    <Icon as={FiMoreVertical} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="List Actions">
                      <MenuItem onClick={handleDelete}>Delete List...</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            <Droppable droppableId={list._id}>
              {(provided, snapshot) => (
                <Flex
                  ref={provided.innerRef}
                  py={2}
                  flexDir="column"
                  alignItems="center"
                  width="100%"
                >
                  {list.cards &&
                    list.cards.map((card, index) => (
                      <Card
                        cardId={card}
                        listId={listId}
                        index={index}
                        key={card}
                      />
                    ))}
                  {provided.placeholder}
                </Flex>
              )}
            </Droppable>
            <CreateCard listId={listId} />
          </Box>
        )}
      </Draggable>
    );
  } else {
    return null;
  }
};
export default List;
