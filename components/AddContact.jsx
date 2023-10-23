import { useState, useContext, useEffect } from "react";
import { Box, Input, Heading, Button, Stack, useToast } from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { addContact } from "../api/contact";
import { useRouter } from "next/navigation";

const AddContact = () => {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContactCreate = async () => {
    setIsLoading(true);
    const contact = {
      firstName,
      lastName,
      email,
      phone,
      userId: user.uid,
    };
    await addContact(contact);
    setIsLoading(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    toast({ title: "Contact created successfully", status: "success" });
  };

  return (
    <Box
      w={{ base: "80%", md: "60%", lg: "40%" }}
      margin={"0 auto"}
      display="block"
      mt={5}
    >
      <Heading mb={4}>New contact</Heading>
      <Stack direction="column">
        <Input
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button
          onClick={() => handleContactCreate()}
          disabled={firstName.length < 1 || email.length < 1 || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddContact;
