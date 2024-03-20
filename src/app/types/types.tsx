import { paths } from "./shema";

export type RandomResponse =
  paths["/api/v1/games/random"]["get"]["responses"][200]["content"]["*/*"];
export type GameByTitleResponse =
  paths["/api/v1/games/search"]["get"]["responses"][200]["content"]["*/*"];
export type PopularResponse =
  paths["/api/v1/games/popular"]["get"]["responses"][200]["content"]["*/*"];
export type FullInfoResponse =
  paths["/api/v1/games/{game-id}"]["get"]["responses"][200]["content"]["*/*"];
export type AllGenreResponse =
  paths["/api/v1/genres"]["get"]["responses"][200]["content"]["*/*"];
export type ByGenreResponse =
  paths["/api/v1/games/genre"]["get"]["responses"][200]["content"]["*/*"];
export type FullInfoUserResponse =
  paths["/api/v1/users/profile"]["get"]["responses"][200]["content"]["*/*"];
export type AllItemsInCartResponse =
  paths["/api/v1/cart"]["get"]["responses"][200]["content"]["*/*"];
export type AllGamesResponse =
  paths["/api/v1/games"]["get"]["responses"][200]["content"]["*/*"];
export type AllFiltersByNameResponse =
  paths["/api/v1/tags"]["get"]["responses"][200]["content"]["*/*"];
export type CreatePaymentResponse =
  paths["/api/v1/checkout/stripe/create-payment"]["post"]["responses"][200]["content"]["*/*"];
export type CaptureResponse =
  paths["/api/v1/checkout/paypal/capture-payment"]["post"]["responses"][200]["content"]["*/*"];
export type AllGamesInAccountResponse =
  paths["/api/v1/users/games"]["get"]["responses"][200]["content"]["*/*"];
export type GetBalanceInAccountResponse =
  paths["/api/v1/users/balance"]["get"]["responses"][200]["content"]["*/*"];
