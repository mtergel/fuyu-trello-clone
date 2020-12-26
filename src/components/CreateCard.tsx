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
import FocusLock from "react-focus-lock";
import { useList } from "../redux/list/useList";
import { useCard } from "../redux/cards/useCard";

interface CreateCardProps {
  listId: string;
}

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
  onSubmit: (cardTitle: string) => void;
  listId: string;
}
const Form = ({ firstFieldRef, onCancel, onSubmit, listId }: FormProps) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Stack spacing={4}>
        <TextInput
          label="Card title"
          id={`card-title-${listId}`}
          ref={firstFieldRef}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="green" type="submit">
            Add
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  );
};

const CreateCard: React.FC<CreateCardProps> = ({ listId }) => {
  const { AddCard } = useCard(null, listId);
  const handleCard = (cardTitle: string) => {
    AddCard(listId, cardTitle);
  };
  const { list } = useList(listId);
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
            width="100%"
            borderRadius={3}
            py={2}
            px={4}
            display="flex"
            flexDir="column"
            maxHeight="100%"
            position="relative"
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
                {list && list.cards && list.cards.length > 0
                  ? "Add another card"
                  : "Add new card"}
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
              onSubmit={handleCard}
              listId={listId}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
export default CreateCard;
