import {
  FullInfoResponse,
  AllGamesInAccountResponse,
} from "./../../../types/types";
import { RandomResponse } from "../../../types/types";
export type gameMedia = FullInfoResponse["gameMedia"];

export interface IMainProps {
  slides: RandomResponse;
  recommendations: RandomResponse;
  byGenre: RandomResponse;
  genreTitle: string;
}

export interface IMostPopularProps {
  slides: RandomResponse;
}
export interface IRecommendationsProps {
  title: string;
  data: RandomResponse | AllGamesInAccountResponse;
}
