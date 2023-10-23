import { useContext, useState } from "react";
import { Box, Center, Container, Image, Stack, VStack } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Auth from "@/components/Auth";
import HomeItems from "@/components/Home";

export default function Home() {
  const { user } = useContext(AuthContext);

  return user ? (
    <Container maxW="7xl">
      <Navbar />
      <HomeItems />
    </Container>
  ) : (
    <Container maxW="7xl">
      <Center h="100vh">
        <VStack>
          <Image
            boxSize="200px"
            objectFit="contain"
            src="flo-logo.png"
            alt="flo logo"
          />
          <Auth />
        </VStack>
      </Center>
    </Container>
  );
}
