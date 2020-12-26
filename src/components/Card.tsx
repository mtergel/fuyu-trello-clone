import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useCard } from "../redux/cards/useCard";

interface CardProps {
  cardId: string;
  listId: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ cardId, listId, index }) => {
  const { card } = useCard(cardId, listId);
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
            <Text>{card.title}</Text>
          </Box>
        )}
      </Draggable>
    );
  } else {
    return null;
  }
};
export default Card;
