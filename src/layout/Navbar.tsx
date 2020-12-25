import { Box, Image, Stack } from "@chakra-ui/react";
import React from "react";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Box width="100%" height="50px">
      <Stack
        spacing={8}
        background="rgba(0, 0, 0, .2)"
        px={[4, 8, 16]}
        flexGrow={1}
      >
        <Image src="/logo.png" objectFit="contain" height="50px" width="auto" />
      </Stack>
    </Box>
  );
};
export default Navbar;
