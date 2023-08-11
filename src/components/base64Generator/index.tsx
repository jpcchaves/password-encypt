import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

export const Base64Generator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const toast = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedFormats.includes(file.type)) {
        convertToBase64(file)
          .then((base64String) => {
            setImgBase64(base64String);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        throw new Error("Antonio");
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        const base64WithoutPrefix = removeBase64Prefix(base64String);
        resolve(base64WithoutPrefix);
        setIsLoading(false);
      };

      reader.onerror = (error) => {
        reject(error);
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    });
  };

  const removeBase64Prefix = (rawBase64: string): string => {
    return rawBase64.replace(/^data:image\/[a-z]+;base64,/, "");
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
        <Heading>Base 64 Generator</Heading>
        <Text>
          Here you can generate a Base64 from a image file (jpeg, jpg, png,
          etc...)
        </Text>
      </Box>
      {!isLoading && imgBase64 && (
        <Box overflow="hidden" height="200px" position="relative">
          <Text textOverflow={"ellipsis"}>{imgBase64}</Text>

          <IconButton
            position="absolute"
            top="2"
            right="2"
            colorScheme="blue"
            size="md"
            aria-label="button to copy text to clipboard"
            isDisabled={copied}
            _disabled={{
              cursor: "pointer",
              opacity: "1",
            }}
            icon={copied ? <CheckIcon /> : <CopyIcon />}
            onClick={() => handleCopy(imgBase64)}
          />
        </Box>
      )}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/jpg"
        onChange={handleFileSelect}
        id="fileInput"
      />
      <Button
        onClick={() => {
          setImgBase64("");
          //@ts-ignore
          document.getElementById("fileInput").value = "";
        }}
      >
        Clear
      </Button>
    </Flex>
  );
};
