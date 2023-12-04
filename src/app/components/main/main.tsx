import { Container } from "@mui/material";
import { MostPopular } from "./slider/slider";
import { IMainProps } from './types/Response.d';
import { Recommendations } from "./recommendations/recommendations";
import { RecommendationsModule } from "./recommendations/recommendationsModule";


const Main: React.FC<IMainProps> = ({ slides, recommendations, byGenre, genreTitle  }) => {


  return (
    <Container>
      <MostPopular slides={slides}  />
      <Recommendations data={byGenre} title={genreTitle}/>
      <RecommendationsModule data={recommendations} title="Recommendations Module"/>
      <Recommendations data={recommendations} title="Recommendations"/>
    </Container>
  );
};
export { Main };
