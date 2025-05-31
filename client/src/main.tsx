import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "@/styles/globals";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
