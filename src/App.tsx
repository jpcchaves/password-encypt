import { SimpleGrid } from "@chakra-ui/react";

import { ContainerWrapper } from "./components/containerWrapper";
import ThemeToggle from "./components/themeToggle";
import { HashPassword } from "./modules/pages/hashAndUnhash/hashPassword";
import { DecryptPassword } from "./modules/pages/hashAndUnhash/unhashPassword";

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

      <ThemeToggle />
    </>
  );
};

export default App;
