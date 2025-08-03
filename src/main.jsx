import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

// Import các context
import { UserProvider } from "./contexts/UserContext";
import { CarsProvider } from "./contexts/CarsContext";
import { DropDownProvider } from "./contexts/DropDownContext";
import { PickUpDropOffProvider } from "./contexts/PickUpDropOffContext";
import { SnackbarProvider } from "./contexts/SnackbarContext.jsx";

// MUI theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Date picker setup
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Tạo theme MUI
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
      <SnackbarProvider>
        <UserProvider>
          <CarsProvider>
            <DropDownProvider>
              <PickUpDropOffProvider>
                {/* ✅ Bọc LocalizationProvider ở đây */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
                </LocalizationProvider>
              </PickUpDropOffProvider>
            </DropDownProvider>
          </CarsProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
