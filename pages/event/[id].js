import React from "react";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import Auth from "@/components/Auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-app";

const EventItem = ({ itemData }) => {
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }
  return (
    <Container>
      <Auth />
      <Box mt={5}>
        <Heading as="h3" fontSize={"xl"}>
          {itemData.title}
        </Heading>
        <Heading as="h2" fontSize={"l"}>
          {itemData.date}
        </Heading>
        <Text>{itemData.description}</Text>
        <Text>{itemData.status}</Text>
        <Text>{itemData.createdAt}</Text>
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context) {
  let itemData = null;
  const docRef = doc(db, "event", context.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    itemData = docSnap.data();
  }
  return {
    props: {
      itemData,
    },
  };
}

export default EventItem;
