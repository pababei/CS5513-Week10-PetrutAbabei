import { useState, useContext, useEffect } from "react";
import {
  Box,
  Input,
  Heading,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { addTodo } from "../api/todo";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user == null) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      router.push("/");
    }
  });

  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);

  const handleTodoCreate = async () => {
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    toast({ title: "Todo created successfully", status: "success" });
  };

  return (
    <Box
      w={{ base: "80%", md: "60%", lg: "40%" }}
      margin={"0 auto"}
      display="block"
      mt={5}
    >
      <Heading mb={4}>New to do</Heading>
      <Stack direction="column">
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
            value={"pending"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            Pending ⌛
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completed ✅
          </option>
        </Select>
        <Button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
