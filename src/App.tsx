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

import bcrypt, { hash } from "bcryptjs";
import { useState } from "react";
import { ContainerWrapper } from "./components/containerWrapper";
import { HashPassword } from "./components/hashPassword";

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
        <HashPassword
          clearPasswordInput={clearPasswordInput}
          decrementSalt={decrementSalt}
          hashPassword={hashPassword}
          hashedPassword={hashedPassword}
          incrementSalt={incrementSalt}
          password={password}
          saltRounds={saltRounds}
          setHashedPassword={setHashedPassword}
          setPassword={setPassword}
        />
      </ContainerWrapper>
      <ContainerWrapper>
        <></>
      </ContainerWrapper>
    </SimpleGrid>
  );
};

export default App;
