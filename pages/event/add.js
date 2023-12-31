import { useContext, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import AddEvent from "@/components/AddEvent";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function NewEvent() {
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
        <AddEvent />
      </Container>
    )
  );
}
