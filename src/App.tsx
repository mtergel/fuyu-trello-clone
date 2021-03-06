import React, { useState } from "react";
import { useBoard } from "./redux/board/useBoard";
import List from "./components/List";
import Layout from "./layout/Layout";
import { Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import EditBoard from "./components/EditBoard";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import CreateList from "./components/CreateList";
import { useList } from "./redux/list/useList";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { board, MoveList } = useBoard();
  const { MoveCard } = useList(null);
  // todo
  const handleMovelist = (result: DropResult, provided: ResponderProvided) => {
    // column e.g list
    if (!result.destination) return;
    console.log(result);
    if (result.type === "COLUMN") {
      if (result.source.index !== result.destination.index) {
        MoveList(result.source.index, result.destination?.index);
      }
      // card
    } else {
      if (
        result.source.index !== result.destination.index ||
        result.source.droppableId !== result.destination.droppableId
      ) {
        MoveCard(
          result.source.index,
          result.destination.index,
          result.source.droppableId,
          result.destination.droppableId
        );
      }
    }
  };

  const [editState, setEditState] = useState(false);
  const handleToggle = () => {
    setEditState((prevState) => !prevState);
  };

  console.log(board);

  return (
    <Layout>
      <Flex
        flexDir="column"
        width="100%"
        height="100%"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundImage={`url(${board.backgroundImage})`}
        backgroundAttachment="fixed"
        backgroundSize="cover"
        color="#fff"
      >
        <Stack
          spacing={8}
          background="rgba(0, 0, 0, .48)"
          py={5}
          px={[4, 8, 16]}
        >
          <Flex align="center">
            {editState ? (
              <EditBoard handleToggle={handleToggle} />
            ) : (
              <>
                <Heading as="h3" size="lg">
                  {board.title}
                </Heading>
                <IconButton
                  mx={6}
                  aria-label="Edit board"
                  icon={<EditIcon />}
                  onClick={handleToggle}
                />
              </>
            )}
          </Flex>
        </Stack>

        <DragDropContext onDragEnd={handleMovelist}>
          <Droppable
            droppableId={`board-${board.title}`}
            direction="horizontal"
            type="COLUMN"
          >
            {(provided, snapshot) => (
              <Flex
                overflowX="auto"
                ref={provided.innerRef}
                py={6}
                px={[4, 16, 32]}
                background="linear-gradient(180deg,rgba(0,0,0,.48) 0,rgba(0,0,0,.24) 48px,transparent 100%,transparent)"
                flexGrow={1}
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                {board.lists.map((listId, index) => (
                  <List listId={listId} key={listId} index={index} />
                ))}
                {provided.placeholder}
                <CreateList />
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
    </Layout>
  );
};
export default App;
