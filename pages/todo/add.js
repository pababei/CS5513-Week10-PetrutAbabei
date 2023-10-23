import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";

export default function NewTodo() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  });
  return (
    user && (
      <Container maxW="7xl">
        <Navbar />
        <AddTodo />
      </Container>
    )
  );
}
