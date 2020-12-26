import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useCard } from "../redux/cards/useCard";

interface CardProps {
  cardId: string;
  listId: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ cardId, listId, index }) => {
  const { card, DeleteCard } = useCard(cardId, listId);
  if (card) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <Box
            boxSizing="border-box"
            verticalAlign="top"
            rounded="md"
            backgroundColor="rgba(26, 32, 44, 0.7)"
            borderRadius={3}
            p={2}
            my={1}
            mx={4}
            width="100%"
            display="flex"
            flexDir="column"
            maxHeight="100%"
            position="relative"
            boxShadow="lg"
            color="white"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Flex alignItems="center">
              <Text flexGrow={1}>{card.title}</Text>
              <IconButton
                onClick={() => DeleteCard(listId, cardId)}
                aria-label="Delete card"
              >
                <DeleteIcon />
              </IconButton>
            </Flex>
          </Box>
        )}
      </Draggable>
    );
  } else {
    return null;
  }
};
export default Card;
