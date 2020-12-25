import { extendTheme } from "@chakra-ui/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
    mono: "Poppins, monospace",
  },
});

export default theme;
