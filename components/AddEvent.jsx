import React from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";

const AddEvent = () => {
  const [date, setDate] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("planned");
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleEventCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create an event",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const event = {
      date,
      title,
      description,
      status,
      userId: user.uid,
    };
    await addEvent(event);
    setIsLoading(false);
    setDate("");
    setTitle("");
    setDescription("");
    setStatus("");
    toast({ title: "Event created successfully", status: "success" });
  };
  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Heading mb={4}>New Event</Heading>
      <Stack direction="column">
        <Input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"planned"}
            style={{ color: "blue", fontWeight: "bold" }}
          >
            Planned
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completed
          </option>
          <option
            value={"canceled"}
            style={{ color: "gray", fontWeight: "bold" }}
          >
            Canceled
          </option>
        </Select>
        <Button
          onClick={() => handleEventCreate()}
          disabled={
            date.length < 1 ||
            title.length < 1 ||
            description.length < 1 ||
            isLoading
          }
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEvent;
