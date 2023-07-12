import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

const ThemeToggle = () => {
  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  const fadeIn = {
    opacity: 1,
    transition,
  };

  const fadeOut = {
    opacity: 0,
    transition,
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" right="10" bottom="10">
      <motion.div whileTap={{ scale: 0.9 }}>
        <IconButton
          icon={
            colorMode === "light" ? (
              <SunIcon boxSize={"5"} />
            ) : (
              <MoonIcon boxSize={"5"} />
            )
          }
          onClick={toggleColorMode}
          size="lg"
          rounded={"full"}
          aria-label="Toggle dark mode"
          colorScheme={colorMode === "light" ? "orange" : "blue"}
        />
      </motion.div>
    </Box>
  );
};

export default ThemeToggle;
