"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Image,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { FaMoon, FaSun } from "react-icons/fa";
import Auth from "./Auth";

export const navItems = [
  {
    id: 1,
    name: "Todos",
    listLink: "/todos",
    addName: "New todo",
    addLink: "/todo/add",
  },
  {
    id: 2,
    name: "Events",
    listLink: "/events",
    addName: "New event",
    addLink: "/event/add",
  },
  {
    id: 3,
    name: "Contacts",
    listLink: "/contacts",
    addName: "New contact",
    addLink: "/contact/add",
  },
];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={children.listLink}
    >
      {children.name}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Image
                boxSize="60px"
                objectFit="contain"
                src="/flo-logo.png"
                alt="flo logo"
              />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navItems.map((item) => (
                <NavLink key={item.id}>{item}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                w="90px"
                aria-label="Add item"
                colorScheme="teal"
                variant="solid"
                leftIcon={<AddIcon />}
              >
                Add
              </MenuButton>
              <MenuList>
                {navItems.map((item) => (
                  <MenuItem as="a" href={item.addLink} key={item.id}>
                    {item.addName}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Box px={3} py={1}>
              <Button
                as={IconButton}
                aria-label="Options"
                icon={colorMode == "dark" ? <FaSun /> : <FaMoon />}
                onClick={() => toggleColorMode()}
              ></Button>{" "}
            </Box>

            <Auth />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navItems.map((item) => (
                <NavLink key={item.id}>{item}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
