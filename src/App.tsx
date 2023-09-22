import { SimpleGrid } from "@chakra-ui/react";

import { ContainerWrapper } from "./components/containerWrapper";
import ThemeToggle from "./components/themeToggle";
import { HashPassword } from "./modules/pages/hashAndUnhash/hashPassword";
import { DecryptPassword } from "./modules/pages/hashAndUnhash/unhashPassword";
import { Base64Generator } from "./modules/pages/base64/base64Generator";

const App = () => {
  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }}>
        <ContainerWrapper>
          <HashPassword />
        </ContainerWrapper>
        <ContainerWrapper>
          <DecryptPassword />
        </ContainerWrapper>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, sm: 1, md: 1 }}>
        <ContainerWrapper>
          <Base64Generator />
        </ContainerWrapper>
      </SimpleGrid>
      <ThemeToggle />
    </>
  );
};

export default App;
