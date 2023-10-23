import { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-app";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const EventItem = ({ itemData }) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  });

  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState(itemData.title);
  const [date, setDate] = useState(itemData.date);
  const [description, setDescription] = useState(itemData.description);
  const [status, setStatus] = useState(itemData.status);

  const sendData = async () => {
    console.log("sending", itemData);
    const docRef = doc(db, "event", itemData.id);
    updateDoc(docRef, {
      date: date,
      title: title,
      description: description,
      status: status,
    })
      .then((docRef) => {
        toast({ title: "Event updated successfully", status: "success" });
      })
      .catch((error) => {
        toast({
          title: "Event could not be updated",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      });
    router.push("/events");
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
          <Heading mb={4}>Edit event</Heading>
          <Stack spacing={3}>
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
  const docRef = doc(db, "event", context.params.id);
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

export default EventItem;
