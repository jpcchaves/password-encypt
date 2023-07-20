import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
import { useState } from "react";

interface IProps {}

export const DecryptPassword = ({}: IProps) => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [hasError, setHashError] = useState(false);

  const checkPasswords = async () => {
    if (!password || !hashedPassword) {
      return;
    }

    if (await passwordsCheck(password, hashedPassword)) {
      setResultMessage("Match!");
      setHashError(false);
      return;
    }

    setResultMessage("Not Match!");
    setHashError(true);
  };

  const passwordsCheck = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  };

  const clearInputs = () => {
    setPassword("");
    setHashedPassword("");
    setResultMessage("");
    setHashError(false);
  };

  return (
    <Flex flexDir={"column"}>
      <Box mb="4">
        <Heading>Decrypt</Heading>
        <Text>
          Test your Bcrypt hash against some plaintext, to see if they match.
        </Text>
      </Box>
      {resultMessage && (
        <Box>
          <Heading size="md">Result:</Heading>
          <Container
            my="2"
            p={"6"}
            border={"1px"}
            borderRadius="base"
            borderColor={hasError ? "red.300" : "green.300"}
          >
            <Text>{resultMessage}</Text>
          </Container>
        </Box>
      )}
      <Input
        name="hashedPassword"
        placeholder="Hash to check"
        onChange={(e) => setHashedPassword(e.target.value)}
        value={hashedPassword}
        mb="2"
      />
      <Input
        name="password"
        placeholder="Password to check against"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        mb="2"
      />

      <Button
        type="button"
        colorScheme="blue"
        onClick={() => checkPasswords()}
        mb="2"
      >
        Decrypt Password
      </Button>
      <Button type="button" onClick={() => clearInputs()}>
        Clear
      </Button>
    </Flex>
  );
};
