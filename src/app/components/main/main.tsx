import { Container } from "@mui/material";
import { MostPopular } from "./slider/slider";
import { IMainProps } from './types/Response.d';
import { Recommendations } from "./recommendations/recommendations";
import { RecommendationsModule } from "./recommendations/recommendationsModule";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../../reactQuery/Hydrate";
import getQueryClient from "@/app/reactQuery/get-query-client";
import { Suspense } from "react";


const Main: React.FC<IMainProps> = ({ slides, recommendations, byGenre, genreTitle  }) => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <Suspense fallback={<p>Loading feed...</p>}>
          <MostPopular slides={slides}  />
          <Recommendations data={byGenre} title={genreTitle}/>
          <Hydrate  state={dehydratedState}>
            <RecommendationsModule data={recommendations}/>
          </Hydrate>
          <Recommendations data={recommendations} title="Recommendations"/>
      </Suspense>
      
    </Container>
  );
};
export { Main };
