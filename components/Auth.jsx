import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase/firebase-app";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        toast({
          title: "Login successful",
          description: "Welcome, " + user.displayName,
          status: "success",
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleSignout = () => {
    router.push("/");
    auth.signOut();
  };

  return (
    <Box>
      {isLoggedIn && (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={user.photoURL} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Text color="green.500">{user.displayName}</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <Link color="red.500" onClick={() => handleSignout()}>
                Logout
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {!isLoggedIn && (
        <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login with Google
        </Button>
      )}
    </Box>
  );
};
export default Auth;
