import { Suspense } from 'react';

import Loading from '@/app/loading';
import getQueryClient from '@/app/reactQuery/get-query-client';
import { Container } from '@mui/material';
import { dehydrate } from '@tanstack/react-query';

import Hydrate from '../../reactQuery/Hydrate';
import { Recommendations } from './recommendations/recommendations';
import { RecommendationsModule } from './recommendations/recommendationsModule';
import { MostPopular } from './slider/slider';
import { IMainProps } from './types/Response.d';

const Main: React.FC<IMainProps> = ({
  slides,
  recommendations,
  byGenre,
  genreTitle,
}) => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <MostPopular slides={slides} />
        <Recommendations data={byGenre} title={genreTitle} />
        <Hydrate state={dehydratedState}>
          <RecommendationsModule data={recommendations} />
        </Hydrate>
        <Recommendations data={recommendations} title="Recommendations" />
      </Suspense>
    </Container>
  );
};
export { Main };
