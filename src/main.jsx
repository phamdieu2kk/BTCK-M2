import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Đảm bảo ReactDOM được import

import App from "./App.jsx";

// Import từng context trực tiếp
import { UserProvider } from "./contexts/UserContext";
import { CarsProvider } from "./contexts/CarsContext";
import { DropDownProvider } from "./contexts/DropDownContext";
import { PickUpDropOffProvider } from "./contexts/PickUpDropOffContext";
import { SnackbarProvider } from "./contexts/SnackbarContext.jsx";

// MUI theme & reset
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Custom MUI theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider> {/* ✅ Dùng cho toast/snackbar */}
        <UserProvider>
          <CarsProvider>
            <DropDownProvider>
              <PickUpDropOffProvider>
                <App />
              </PickUpDropOffProvider>
            </DropDownProvider>
          </CarsProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
