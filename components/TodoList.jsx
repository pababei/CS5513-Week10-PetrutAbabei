import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase-app";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      console.log(ar);
      setTodos(ar);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  const handleTodoClick = (id) => {
    router.push(`/todo/${id}`);
  };

  return (
    <Box mt={5}>
      {user && (
        <Box>
          <Heading mb={4}>My to do list</Heading>
          <Button
            mb={3}
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              router.push("/todo/add");
            }}
          >
            Add To Do
          </Button>
        </Box>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos &&
          todos.map((todo) => (
            <Box
              key={todo.id}
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Flex>
                <Box onClick={() => handleTodoClick(todo.id)}>
                  <Heading as="h3" fontSize={"xl"}>
                    {todo.title}{" "}
                  </Heading>
                  <Text>{todo.description}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Badge
                    color="red.500"
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                      bg: "inherit",
                      transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleTodoDelete(todo.id)}
                  >
                    <FaTrash />
                  </Badge>
                  <Badge
                    color={todo.status == "pending" ? "gray.500" : "green.500"}
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                      bg: "inherit",
                      transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleToggle(todo.id, todo.status)}
                  >
                    {todo.status == "pending" ? (
                      <FaToggleOff />
                    ) : (
                      <FaToggleOn />
                    )}
                  </Badge>
                  <Badge
                    float="right"
                    opacity="0.8"
                    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                  >
                    {todo.status}
                  </Badge>
                </Box>
              </Flex>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};
export default TodoList;
