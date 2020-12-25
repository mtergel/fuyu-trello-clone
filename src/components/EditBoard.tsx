import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useBoard } from "../redux/board/useBoard";
import { AiOutlinePicture } from "react-icons/ai";
import { backgroundImageOptions } from "./EditBoardBgOptions";

interface EditBoardProps {
  handleToggle: () => void;
}

const EditBoard: React.FC<EditBoardProps> = ({ handleToggle }) => {
  const { board, ChangeTitle, ChangeBackground } = useBoard();
  const handleChangeTitle = () => {
    ChangeTitle(value);
    handleToggle();
  };
  const handleChangeBackground = () => {
    if (selectedBackground?.regular) {
      ChangeBackground(selectedBackground?.regular);
      onClose();
    }
  };

  const [value, setValue] = useState(board.title || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  // background modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // modal preview
  const [selectedBackground, setSelectedBackground] = useState(
    board.backgroundImage
      ? backgroundImageOptions.find((i) => i.regular === board.backgroundImage)
      : null
  );
  return (
    <>
      <Box maxWidth="245px">
        <Input value={value} onChange={handleChange} size="md" autoFocus />
      </Box>
      <ButtonGroup mx={6} spacing={3}>
        <IconButton
          aria-label="Change board"
          icon={<CheckIcon />}
          onClick={handleChangeTitle}
        />
        <IconButton
          aria-label="Discard changes"
          icon={<CloseIcon />}
          onClick={handleToggle}
        />
        <IconButton
          aria-label="Open background changed modal"
          icon={<Icon as={AiOutlinePicture} />}
          onClick={onOpen}
        />
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="gray.500"
          backgroundSize="cover"
          backgroundPosition="50%"
          color="#fff"
          backgroundImage={
            selectedBackground ? `url(${selectedBackground.small})` : "none"
          }
        >
          <Box
            backgroundColor="rgba(0,0,0, 0.4)"
            bottom="0"
            left="0"
            position="absolute"
            right="0"
            top="0"
            borderRadius="3px"
            display="block"
          />
          <Box position="relative">
            <ModalHeader>Create new Board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Add board Title"
                size="md"
                autoFocus
              />
              <Box pt={4}>
                <Heading as="h6" size="xs">
                  Choose background
                </Heading>
                <Wrap pt={2} justify="center">
                  {backgroundImageOptions.map((bg, index) => (
                    <WrapItem key={index}>
                      <Image
                        src={bg.small}
                        width="70px"
                        height="70px"
                        objectFit="cover"
                        cursor="pointer"
                        backgroundColor={"#97a0af"}
                        onClick={() => setSelectedBackground(bg)}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="white"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              colorScheme="green"
              disabled={value === ""}
              onClick={handleChangeBackground}
            >
              Create Board
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditBoard;
