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
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase-app";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteEvent, changeEventStatus } from "../api/event";

const EventList = () => {
  const [events, setEvents] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const refreshData = () => {
    if (!user) {
      setEvents([]);
      return;
    }
    const q = query(collection(db, "event"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      console.log(ar);
      setEvents(ar);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);

  const handleEventDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
      deleteEvent(id);
      toast({ title: "Event deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "planned" : "completed";
    await changeEventStatus({ docId: id, status: newStatus });
    toast({
      title: `Event marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  const handleEventClick = (id) => {
    router.push(`/event/${id}`);
  };

  return (
    <Box mt={5}>
      {user && (
        <Box>
          <Heading mb={4}>My event list</Heading>
          <Button
            mb={3}
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              router.push("/event/add");
            }}
          >
            Add Event
          </Button>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {events &&
          events.map((event) => (
            <Box
              key={event.id}
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Flex>
                <Box onClick={() => handleEventClick(event.id)}>
                  <Heading as="h3" fontSize={"xl"}>
                    {event.title}{" "}
                  </Heading>
                  <Heading as="h4" fontSize={"l"}>
                    {event.date}
                  </Heading>
                  <Text>{event.description}</Text>
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
                    onClick={() => handleEventDelete(event.id)}
                  >
                    <FaTrash />
                  </Badge>
                  <Badge
                    color={event.status == "planned" ? "gray.500" : "green.500"}
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                      bg: "inherit",
                      transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleToggle(event.id, event.status)}
                  >
                    {event.status == "planned" ? (
                      <FaToggleOff />
                    ) : (
                      <FaToggleOn />
                    )}
                  </Badge>
                  <Badge
                    float="right"
                    opacity="0.8"
                    bg={event.status == "planned" ? "yellow.500" : "green.500"}
                  >
                    {event.status}
                  </Badge>
                </Box>
              </Flex>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};
export default EventList;
