import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" width="100%" height="100%">
      <Navbar />
      <Box as="main" height="100%">
        {children}
      </Box>
    </Flex>
  );
};
export default Layout;
