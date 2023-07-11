import {
  Box,
  Button,
  Container,
  Flex,
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
        <Flex flexDir={"column"} justify={"center"} align={"center"}>
          <Box>
            <Text>{hashedPassword}</Text>
          </Box>
          <Input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Flex align={"center"}>
            <Button rounded={"full"} onClick={() => decrementSalt()}>
              -
            </Button>
            <Box mx="5">{saltRounds}</Box>
            <Button rounded={"full"} onClick={() => incrementSalt()}>
              +
            </Button>
          </Flex>
          <Box>
            <Button type="button" onClick={() => hashPassword()}>
              Hash Password
            </Button>
          </Box>
        </Flex>
      </ContainerWrapper>
      <ContainerWrapper>
        <></>
      </ContainerWrapper>
    </SimpleGrid>
  );
};

export default App;
