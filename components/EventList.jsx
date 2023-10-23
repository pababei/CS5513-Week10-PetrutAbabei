import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import { deleteEvent, changeEventStatus } from "../api/event";
import { getAllItems } from "@/api/query";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  getAllItems(setEvents, "event", user);

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
    user && (
      <Box mt={5}>
        <Heading mb={4}>My events</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {events &&
            events.map((event) => (
              <Box
                key={event.id}
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
                  <Box p={3} onClick={() => handleEventClick(event.id)}>
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
                        onClick={() => handleEventDelete(event.id)}
                      >
                        <FaTrash />
                      </Badge>
                      <Badge
                        color={
                          event.status == "planned" ? "gray.500" : "green.500"
                        }
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
                    </Box>
                    <Box p={3}>
                      <Badge
                        float="right"
                        opacity="0.8"
                        bg={
                          event.status == "planned" ? "yellow.500" : "green.500"
                        }
                      >
                        {event.status}
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
export default EventList;
