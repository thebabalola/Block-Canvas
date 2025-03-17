import { Box, Flex, Text } from "@radix-ui/themes";
import WalletConnection from "./WalletConnection";
import { Link } from "react-router-dom";
import { Palette } from "lucide-react";

const Header = () => {
  return (
    <Flex
      gap="3"
      as="header"
      align="center"
      justify="between"
      className="bg-blur fixed top-4 left-[3%] right-[3%] w-[94%] h-[70px] shadow-custom z-50 rounded-lg"
    >
      {/* Logo with left margin */}
      <Box className="ml-4">
        <Link to="/" className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-[#00d2ff]" />
          <Text className="text-[var(--text-primary)] font-bold text-2xl" as="span" role="img" aria-label="logo">
            BlockCanvas
          </Text>
        </Link>
      </Box>

      {/* Wallet Connection with right margin */}
      <Box className="mr-4">
        <WalletConnection />
      </Box>
    </Flex>
  );
};

export default Header;
