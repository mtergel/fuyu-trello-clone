import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
  InputProps,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useBoard } from "../redux/board/useBoard";
import FocusLock from "react-focus-lock";
import { useList } from "../redux/list/useList";

interface CreateListProps {}

interface TextInputProps extends InputProps {
  label: string;
}
const TextInput = React.forwardRef(
  (
    props: TextInputProps,
    ref:
      | React.MutableRefObject<HTMLInputElement | null>
      | ((instance: HTMLInputElement | null) => void)
      | null
  ) => {
    const { label } = { ...props };

    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    );
  }
);

interface FormProps {
  firstFieldRef: React.MutableRefObject<HTMLInputElement | null>;
  onCancel: () => void;
  onSubmit: (listTitle: string) => void;
}
const Form = ({ firstFieldRef, onCancel, onSubmit }: FormProps) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="List title"
        id="list-title"
        ref={firstFieldRef}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Add
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const CreateList: React.FC<CreateListProps> = ({}) => {
  const { board } = useBoard();
  const { AddList } = useList(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        initialFocusRef={firstFieldRef}
        onClose={onClose}
        placement="bottom"
      >
        <PopoverTrigger>
          <Box
            boxSizing="border-box"
            verticalAlign="top"
            rounded="md"
            width="272px"
            backgroundColor="rgba(26, 32, 44, 0.7)"
            borderRadius={3}
            py={2}
            px={4}
            display="flex"
            flexDir="column"
            maxHeight="100%"
            position="relative"
            boxShadow="lg"
            color="white"
          >
            <Flex
              alignItems="center"
              height="36px"
              onClick={onOpen}
              as="button"
            >
              <Icon mr={3}>
                <AddIcon />
              </Icon>
              <Text>
                {board.lists.length > 0 ? "Add another list" : "Add new list"}
              </Text>
            </Flex>
          </Box>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              firstFieldRef={firstFieldRef}
              onCancel={onClose}
              onSubmit={AddList}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
export default CreateList;
