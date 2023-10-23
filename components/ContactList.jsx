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
import { FaTrash } from "react-icons/fa";
import { deleteContact } from "../api/contact";
import { getAllItems } from "@/api/query";
import { AuthContext } from "@/context/AuthContext";

const ContactList = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  });

  getAllItems(setContacts, "contact", user);

  const handleContactDelete = async (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteContact(id);
      toast({ title: "Contact deleted successfully", status: "success" });
    }
  };

  const handleContactClick = (id) => {
    router.push(`/contact/${id}`);
  };

  return (
    user && (
      <Box mt={5}>
        <Heading mb={4}>My contacts</Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {contacts &&
            contacts.map((contact) => (
              <Box
                key={contact.id}
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
                  <Box p={3} onClick={() => handleContactClick(contact.id)}>
                    <Heading as="h3" fontSize={"xl"}>
                      {contact.firstName} {contact.lastName}
                    </Heading>
                    <Text>{contact.email}</Text>
                    <Text>{contact.phone}</Text>
                  </Box>
                  <Spacer />
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
                      onClick={() => handleContactDelete(contact.id)}
                    >
                      <FaTrash />
                    </Badge>
                  </Box>
                </Flex>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    )
  );
};
export default ContactList;
