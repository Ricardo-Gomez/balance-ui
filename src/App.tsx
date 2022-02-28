import * as React from "react";
import {
  ChakraProvider,
  theme as BaseTheme,
  extendTheme,
} from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { RecoilRoot } from "recoil";

const theme = extendTheme(BaseTheme, {
  config: {
    useSystemColorMode: true,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      ".react-date-picker": {
        backgroundColor: mode("white", "gray.700")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
      ".react-calendar": {
        backgroundColor: mode("white", "gray.700")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
      ".react-calendar__tile:enabled:hover": {
        backgroundColor: mode("#e6e6e6", "gray.300")(props),
        color: mode("whiteAlpha.900", "gray.800")(props),
      },
      ".react-calendar__tile:enabled:hover.react-calendar__month-view__days__day--weekend, .react-calendar__month-view__days__day--weekend":
        {
          color: mode("#d10000", "green.500")(props),
        },
      ".react-calendar__tile--now": {
        backgroundColor: mode("#ffff76", "teal.300")(props),
        color: mode("whiteAlpha.900", "gray.800")(props),
      },
      ".react-calendar__tile--now:enabled:hover": {
        backgroundColor: mode("#ffffa9", "teal.200")(props),
        color: mode("whiteAlpha.900", "gray.800")(props),
      },
      ".react-calendar__tile--active:enabled:hover": {
        backgroundColor: mode("#1087ff", "purple.200")(props),
        color: mode("whiteAlpha.900", "gray.800")(props),
      },
      ".react-calendar__tile--active": {
        backgroundColor: mode("#006edc", "purple.300")(props),
        color: mode("whiteAlpha.900", "gray.800")(props),
      },
      "button > svg.react-date-picker__clear-button__icon line, button.react-date-picker__calendar-button > svg line, button.react-date-picker__calendar-button > svg rect":
        {
          stroke: mode("#000", "whiteAlpha.500")(props),
        },
      "button:hover > svg.react-date-picker__clear-button__icon line, button:hover.react-date-picker__calendar-button > svg line, button:hover.react-date-picker__calendar-button > svg rect":
        {
          stroke: mode("blue", "cyan.500")(props),
        },
    }),
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppContextProvider>
      <BrowserRouter>
        <RecoilRoot>
          {/* <React.Suspense fallback={<Loader fullwidth />}> */}
            <Routes />
          {/* </React.Suspense> */}
        </RecoilRoot>
      </BrowserRouter>
    </AppContextProvider>
  </ChakraProvider>
);
