import { Container } from "@chakra-ui/react";

export const ContainerWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <Container mt={"12"} width={"100%"}>
      {children}
    </Container>
  );
};
