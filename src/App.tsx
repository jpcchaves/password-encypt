import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import bcrypt from "bcryptjs";
import { useState } from "react";
import { ContainerWrapper } from "./components/containerWrapper";

const App = () => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [saltRounds, setSaltRounds] = useState<number>(8);

  const hashPassword = () => {
    if (password.length) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      setHashedPassword(hash);
    }
  };

  const clearPasswordInput = () => {
    setHashedPassword("");
    setPassword(""), setSaltRounds(8);
  };

  const incrementSalt = () => {
    if (saltRounds >= 20) {
      return;
    }

    setSaltRounds((prev) => prev + 1);
  };

  const decrementSalt = () => {
    if (saltRounds <= 1) {
      return;
    }

    setSaltRounds((prev) => prev - 1);
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }}>
      <ContainerWrapper>
        <Flex flexDir={"column"}>
          <Box>
            <Heading>Result:</Heading>
            <Container my="2" p={"6"} border={"1px"} borderRadius="base">
              <Text>{hashedPassword}</Text>
            </Container>
          </Box>
          <Input
            name="password"
            placeholder="Enter the password you want to hash"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Flex align={"center"} justify={"center"} my="3">
            <IconButton
              rounded={"full"}
              size={"sm"}
              aria-label="decrement salt"
              icon={<MinusIcon boxSize={"2"} />}
              onClick={() => decrementSalt()}
            />
            <Box mx="2">{saltRounds}</Box>
            <IconButton
              aria-label="increment salt"
              icon={<AddIcon boxSize={"2"} />}
              rounded={"full"}
              size="sm"
              onClick={() => incrementSalt()}
            />
          </Flex>
          <Button
            type="button"
            colorScheme="blue"
            onClick={() => hashPassword()}
            mb="2"
          >
            Hash Password
          </Button>
          <Button type="button" onClick={() => clearPasswordInput()}>
            Clear
          </Button>
        </Flex>
      </ContainerWrapper>
      <ContainerWrapper>
        <></>
      </ContainerWrapper>
    </SimpleGrid>
  );
};

export default App;
