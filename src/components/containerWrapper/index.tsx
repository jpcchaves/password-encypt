import { Container } from "@chakra-ui/react";

export const ContainerWrapper = ({ children }: { children: JSX.Element }) => {
  return <Container mt={32}>{children}</Container>;
};
