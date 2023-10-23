import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import EventList from "@/components/EventList";

export default function Home() {
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
        <EventList />
      </Container>
    )
  );
}
