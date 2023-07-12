import { Button, SimpleGrid, useColorMode } from "@chakra-ui/react";

import bcrypt from "bcryptjs";
import { useState } from "react";
import { ContainerWrapper } from "./components/containerWrapper";
import { HashPassword } from "./components/hashPassword";
import ThemeToggle from "./components/themeToggle";

const App = () => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [saltRounds, setSaltRounds] = useState<number>(8);

  const { toggleColorMode } = useColorMode();

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

  const isSaltInLimit = (saltRounds: number): boolean => {
    const MAX_LIMIT = 20;
    const MIN_LIMIT = 1;

    return saltRounds >= MIN_LIMIT && saltRounds <= MAX_LIMIT;
  };

  const incrementSalt = () => {
    if (isSaltInLimit(saltRounds + 1)) {
      setSaltRounds((prev) => prev + 1);
    }
  };

  const decrementSalt = () => {
    if (isSaltInLimit(saltRounds - 1)) {
      setSaltRounds((prev) => prev - 1);
    }
  };

  return (
    <>
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

      <ThemeToggle />
    </>
  );
};

export default App;
