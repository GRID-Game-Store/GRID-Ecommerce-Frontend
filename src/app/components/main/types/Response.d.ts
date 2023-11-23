interface MetaData {
  id: number;
  name: string;
}

export interface ResponseGamePopular {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  genres: Array<MetaData>;
  platforms: Array<MetaData>;

}


export interface ResponseGameRandom {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
}
export interface IAllGenres {
  id: number,
  name: string
}


export interface IMainProps {
  slides: Array<ResponseGamePopular>;
  recommendations: Array<ResponseGameRandom>;
  byGenre: Array<ResponseGameRandom>
}


export interface IMostPopularProps {
  slides: Array<ResponseGamePopular>;
}
export interface IRecommendationsProps {
  title: string;
  data: Array<ResponseGameRandom>;
}