import { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-app";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const ContactItem = ({ itemData }) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  });

  const toast = useToast();
  const router = useRouter();
  const [firstName, setFirstName] = useState(itemData.firstName);
  const [lastName, setLastName] = useState(itemData.lastName);
  const [email, setEmail] = useState(itemData.email);
  const [phone, setPhone] = useState(itemData.phone);

  const sendData = async () => {
    console.log("sending", itemData);
    const docRef = doc(db, "contact", itemData.id);
    updateDoc(docRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    })
      .then((docRef) => {
        toast({ title: "Contact updated successfully", status: "success" });
      })
      .catch((error) => {
        toast({
          title: "Contact could not be updated",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      });
    router.push("/contacts");
  };

  return (
    user && (
      <Container maxW="7xl">
        <Navbar />
        <Box
          w={{ base: "80%", md: "60%", lg: "40%" }}
          margin={"0 auto"}
          display="block"
          mt={5}
        >
          <Heading mb={4}>Edit contact</Heading>
          <Stack spacing={3}>
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
            <InputGroup>
              <InputLeftAddon children="Created:" />
              <Input
                disabled
                type="text"
                value={new Date(itemData.createdAt).toLocaleDateString("en-US")}
                placeholder="createdAt"
              />
            </InputGroup>
            <Button onClick={() => sendData()}>Update</Button>
          </Stack>
        </Box>
      </Container>
    )
  );
};

export async function getServerSideProps(context) {
  let itemData = null;
  const docRef = doc(db, "contact", context.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    itemData = { id: docSnap.id, ...docSnap.data() };
  }
  return {
    props: {
      itemData,
    },
  };
}

export default ContactItem;
