import React from "react";
import { Center, Heading, SimpleGrid } from "@chakra-ui/react";

const GlobalHeader = () => {
  return (
    <SimpleGrid columns={{ base: 1 }}>
      <Center textAlign={"center"} pt={"12"} px={"12"}>
        <Heading fontSize={"lg"}>
          This app was design to supply solutions for simple daily tasks, such
          as get a BCRYPT based encoded password and decrypt it, generate base
          64 string based on files of type JPG, JPEG and PNG...
        </Heading>
      </Center>
    </SimpleGrid>
  );
};

export default GlobalHeader;
