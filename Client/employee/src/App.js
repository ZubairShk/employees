import "./App.css";
import { getEmployeeDetails } from "./Components/apis/apis";
import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashBoard from "./Components/pages/Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import FormPage from "./Components/pages/FormPage";

let theme = createTheme({
  palette: {
    primary: { main: "#007ae7" },
    secondary: { main: "#F27807" },
  },
  typography: {
    fontFamily: ['"Noto Sans"', "sans-serif"].join(","),
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: ".7em",
          height: ".7em",
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 5px grey",
          webkitBoxShadow: "inset 0 0 5px grey",
          borderRadius: 10,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
        fontWeight: "bold",
      },
      containedPrimary: {
        borderRadius: 16,
        border: "solid 1px #007ae7",
      },
      outlinedPrimary: {
        borderRadius: 16,
        border: "solid 2px #007ae7",
        "&:hover": {
          border: "solid 2px #007ae7",
        },
      },
    },
    MuiTextField: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: 8,
            // height: 56,
          },
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 5,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: "#f93d5c",
        "&$error": {
          color: "#f93d5c",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export const Context = createContext();

function App() {
  const [detail, setDetail] = useState();
  const [edit, setEdit] = useState(false);
  const [newId, setNewId] = useState("");
  const gettingDetails = async () => {
    try {
      const data = await getEmployeeDetails();

      setDetail(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    gettingDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Context.Provider
            value={{ detail, gettingDetails, edit, setEdit, newId, setNewId }}
          >
            <Route exact path="/" component={DashBoard} />
            {/* <DashBoard /> */}
            <Route path="/addNew" component={FormPage} />
          </Context.Provider>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
