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
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import { getAllItems } from "@/api/query";
import { AuthContext } from "@/context/AuthContext";

const TodoList = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  });

  getAllItems(setTodos, "todo", user);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
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
    user && (
      <Box mt={5}>
        <Heading mb={4}>My todos</Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {todos &&
            todos.map((todo) => (
              <Box
                key={todo.id}
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.05)",
                }}
              >
                <Flex>
                  <Box p={3} onClick={() => handleTodoClick(todo.id)}>
                    <Heading as="h3" fontSize={"xl"}>
                      {todo.title}{" "}
                    </Heading>
                    <Text>{todo.description}</Text>
                  </Box>
                  <Spacer />
                  <Box>
                    <Box p={3}>
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
                        color={
                          todo.status == "pending" ? "gray.500" : "green.500"
                        }
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
                    </Box>
                    <Box p={3}>
                      <Badge
                        float="right"
                        opacity="0.8"
                        bg={
                          todo.status == "pending" ? "yellow.500" : "green.500"
                        }
                      >
                        {todo.status}
                      </Badge>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    )
  );
};
export default TodoList;
