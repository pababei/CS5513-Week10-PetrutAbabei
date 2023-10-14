import { ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
