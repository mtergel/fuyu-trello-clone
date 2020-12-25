import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useList } from "../redux/list/useList";
import { FiMoreVertical } from "react-icons/fi";
interface ListProps {
  listId: string;
  index: number;
}

const List: React.FC<ListProps> = ({ listId, index }) => {
  const { list, DeleteList } = useList(listId);
  const handleDelete = () => {
    DeleteList(listId);
  };
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
              <Box px={2}>
                <Heading size="sm">{list.title}</Heading>
                {/* <Input value={value} onChange={handleChange} border="none" /> */}
              </Box>
              <Spacer />
              <Box color="white">
                <Menu>
                  <MenuButton as={Button}>
                    <Icon as={FiMoreVertical} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="List Actions">
                      <MenuItem>Add Card...</MenuItem>
                      <MenuItem>Copy List...</MenuItem>
                      <MenuItem>Move List...</MenuItem>
                      <MenuDivider />
                      <MenuItem>Delete List...</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            {/* <Droppable droppableId={list.id}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {list.cards &&
                      list.cards.map((card, index) => (
                        <CardComponent card={card} index={index} key={card.id} />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable> */}
          </Box>
        )}
      </Draggable>
    );
  } else {
    return null;
  }
};
export default List;
