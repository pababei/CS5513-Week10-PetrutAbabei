import { Box, Button, Center, Heading, Link, VStack } from "@chakra-ui/react";
import { navItems } from "./Navbar";

export default function HomeItems() {
  return (
    <Center h="90vh">
      <VStack spacing={4} align="stretch">
        {navItems.map((item) => (
          <Link key={item.id} href={item.listLink}>
            <Box as={Button} h="25vh" w="80vw" borderWidth="1px">
              <Heading>{item.name}</Heading>
            </Box>
          </Link>
        ))}
      </VStack>
    </Center>
  );
}
