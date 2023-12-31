import { AddIcon, CopyIcon, MinusIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface IProps {}

export const HashPassword = ({}: IProps) => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saltRounds, setSaltRounds] = useState<number>(8);
  const [copied, setCopied] = useState(false);

  const toast = useToast();

  const hashPassword = async () => {
    if (password.length) {
      setLoading(true);
      setResultMessage("Hashing....");
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      setHashedPassword(hash);
      setLoading(false);
    }
  };

  const clearPasswordInput = () => {
    setHashedPassword("");
    setPassword("");
    setSaltRounds(8);
    setResultMessage("");
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Copiado!",
        status: "success",
        duration: 3000,
        position: "top-right",
        size: "2xl",
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <Flex flexDir={"column"}>
      <Box mb="4">
        <Heading>Encrypt</Heading>
        <Text>
          Encrypt some text. The result shown will be a Bcrypt encrypted hash.
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
            position="relative"
          >
            <Text id={hashedPassword ? "result" : ""}>
              {loading ? "Hashing..." : hashedPassword}

              <IconButton
                position="absolute"
                top="0"
                right="0"
                colorScheme="ghost"
                size="sm"
                aria-label="button to copy text to clipboard"
                isDisabled={copied}
                _disabled={{
                  cursor: "pointer",
                  opacity: "1",
                }}
                icon={
                  copied ? (
                    <CheckIcon color="green.300" />
                  ) : (
                    <CopyIcon color="blue.300" />
                  )
                }
                onClick={() => handleCopy(hashedPassword)}
              />
            </Text>
          </Container>
        </Box>
      )}
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
