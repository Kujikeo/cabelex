import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { queryClient } from "../services/queryClient";
import { QueryClientProvider, QueryClient } from "react-query";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { ModalProvider } from "../contexts/ModalContext";
import { ModalProvider as ModalfuncionariosProvider } from "../contexts/funcionariosContext/ModalContext";
import { FuncionarioProvider } from "../contexts/funcionariosContext/FuncionariosContext";
import { FilialProvider } from "../contexts/FilialContext";
import { makeServer } from "../services/mirage";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <ModalProvider>
            <FilialProvider>
              <ModalfuncionariosProvider>
                <FuncionarioProvider>
                  <Component {...pageProps} />
                </FuncionarioProvider>
              </ModalfuncionariosProvider>
            </FilialProvider>
          </ModalProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
