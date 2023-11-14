import { Container } from "@mui/material";
import { MostPopular } from "./slider/slider";
import { IMainProps } from './types/Response.d';


const Main: React.FC<IMainProps> = ({ slides }) => {

  return (
    <Container>
      <MostPopular slides={slides} />
    </Container>
  );
};
export { Main };
