import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ColorModeContext, useMode } from "../context/useMode";
import { TimerProvider } from "./TimerProvider";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const MasterProvider = ({ children }: PropsWithChildren) => {
  const [theme, colorMode] = useMode();
  const queryClient = new QueryClient();

  return (
    <GoogleOAuthProvider clientId="1096462519488-n0lhrkpkjl6ebtor99a0qbtvm0ct9ov9.apps.googleusercontent.com">
      <TimerProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3}>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ColorModeContext.Provider>
          </SnackbarProvider>
        </QueryClientProvider>
      </TimerProvider>
    </GoogleOAuthProvider>
  );
};

export default MasterProvider;
