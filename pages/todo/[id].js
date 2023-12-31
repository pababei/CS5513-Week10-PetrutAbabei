import { useContext, useState, useEffect } from "react";
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

const TodoItem = ({ itemData }) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user == null) {
      router.push("/");
      return;
    }
  });

  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState(itemData.title);
  const [description, setDescription] = useState(itemData.description);
  const [status, setStatus] = useState(itemData.status);

  const sendData = async () => {
    console.log("sending", itemData);
    const docRef = doc(db, "todo", itemData.id);
    updateDoc(docRef, {
      title: title,
      description: description,
      status: status,
    })
      .then((docRef) => {
        toast({ title: "Todo updated successfully", status: "success" });
      })
      .catch((error) => {
        toast({
          title: "Todo could not be updated",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      });
    router.push("/todos");
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
          <Heading mb={4}>Edit to do</Heading>
          <Stack spacing={3}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
            <Textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
            <Select
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option
                value={"pending"}
                style={{ color: "yellow", fontWeight: "bold" }}
              >
                Pending
              </option>
              <option
                value={"completed"}
                style={{ color: "green", fontWeight: "bold" }}
              >
                Completed
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
  const docRef = doc(db, "todo", context.params.id);
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

export default TodoItem;
