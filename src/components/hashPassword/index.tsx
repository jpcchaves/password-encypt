import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";

interface IProps {
  hashedPassword: string;
  password: string;
  saltRounds: number;
  setPassword: (prev: string) => void;
  setHashedPassword: (prev: string) => void;
  decrementSalt: () => void;
  incrementSalt: () => void;
  hashPassword: () => void;
  clearPasswordInput: () => void;
}

export const HashPassword = ({
  password,
  hashPassword,
  hashedPassword,
  saltRounds,
  decrementSalt,
  incrementSalt,
  setPassword,
  clearPasswordInput,
}: IProps) => {
  return (
    <Flex flexDir={"column"}>
      <Box>
        <Heading size="md">Result:</Heading>
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
  );
};
