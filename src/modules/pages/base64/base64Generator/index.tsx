import { useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Image,
  InputGroup,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

export const Base64Generator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<string>("");
  const [imgBase64WithoutPrefix, setImgBase64WithoutPrefix] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasPrefix, setHasPrefix] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const toast = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedFormats.includes(file.type)) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Ocorreu um erro ao gerar o base64. Tente novamente",
          status: "error",
          duration: 3000,
          position: "top-right",
          size: "2xl",
        });
      }
    }
  };

  const handleConvertBase64 = () => {
    convertToBase64(selectedFile!)
      .then((base64String) => {
        setImgBase64(() => base64String);
        setImgBase64WithoutPrefix(() => removeBase64Prefix(base64String));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const convertToBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = () => {
        let base64String = reader.result as string;

        resolve(base64String);
        setIsLoading(false);
      };

      reader.onerror = (error) => {
        reject(error);
        setIsLoading(false);
      };

      if (!file) {
        toast({
          title: "Selecione um arquivo para continuar",
          status: "error",
          duration: 3000,
          position: "top-right",
          size: "2xl",
        });
        return;
      }
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
      <Box>
        <Heading>Base 64 Generator</Heading>
        <Text>
          Here you can generate a Base64 from a image file (jpeg, jpg, png,
          etc...)
        </Text>
      </Box>
      {imgBase64 ? (
        <Box overflow="hidden" height="200px" position="relative">
          <>
            {isLoading ? (
              <AbsoluteCenter>
                <Spinner />
              </AbsoluteCenter>
            ) : (
              <Text textOverflow={"ellipsis"}>
                {hasPrefix ? imgBase64 : imgBase64WithoutPrefix}
              </Text>
            )}

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
          </>
        </Box>
      ) : null}
      <InputGroup my={"2"}>
        <Checkbox
          name={"hasPrefix"}
          isChecked={hasPrefix}
          onChange={() => setHasPrefix((prev) => !prev)}
        >
          With Prefix
        </Checkbox>
      </InputGroup>
      {showPreview && imgBase64 ? (
        <Center>
          <Image src={imgBase64} width={"200px"} />
        </Center>
      ) : null}
      <InputGroup my={"2"}>
        <Checkbox
          disabled={!showPreview && !imgBase64}
          name={"showPreview"}
          isChecked={showPreview}
          onChange={() => setShowPreview((prev) => !prev)}
        >
          Show Preview
        </Checkbox>
      </InputGroup>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/jpg"
        onChange={handleFileSelect}
        id="fileInput"
      />
      <Button
        type="button"
        colorScheme="blue"
        onClick={() => handleConvertBase64()}
        my={"2"}
      >
        Generate Base64
      </Button>
      <Button
        onClick={() => {
          setImgBase64("");
          setImgBase64WithoutPrefix("");
          setShowPreview(() => false);
          setIsLoading(false);
          setSelectedFile(null);
          //@ts-ignore
          document.getElementById("fileInput").value = "";
        }}
      >
        Clear
      </Button>
    </Flex>
  );
};
