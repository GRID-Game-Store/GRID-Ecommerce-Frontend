interface MetaData {
  id : number,
  name: string
}

export interface ResponseGameRandom {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  genres: Array<MetaData>;
}


export interface ResponseGamePopular extends ResponseGameRandom {
  platforms: Array<MetaData>;
}

export type gameMedia =  {
  banner_url: string;
  screenshot_url: string;
  trailer: string;
  trailer_screenshot: string;
}
export interface ResponseGameFullInfo extends ResponseGameRandom{
  release_date: string;
  system_requirements: string
  discount: number;
  permit_age: string;
  publisher : MetaData;
  developer : MetaData;
  tags : Array<MetaData>
  platforms : Array<MetaData>
  game_media : gameMedia
}
export interface IAllGenres {
  id: number,
  name: string
}


export interface IMainProps {
  slides: Array<ResponseGamePopular>;
  recommendations: Array<ResponseGameRandom>;
  byGenre: Array<ResponseGameRandom>;
  genreTitle: string

}


export interface IMostPopularProps {
  slides: Array<ResponseGamePopular>;
}
export interface IRecommendationsProps {
  title: string;
  data: Array<ResponseGameRandom>;
}

