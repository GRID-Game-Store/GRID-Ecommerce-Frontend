import { paths, components } from "./shema";

export type RandomResponse = paths["/api/v1/games/random"]["get"]["responses"][200]["content"]["*/*"];
export type PopularResponse = paths["/api/v1/games/popular"]["get"]["responses"][200]["content"]["*/*"];
export type FullInfoResponse = paths["/api/v1/games/{game-id}"]["get"]["responses"][200]["content"]["*/*"];
export type AllGenreResponse = paths["/api/v1/genres"]["get"]["responses"][200]["content"]["*/*"];
export type ByGenreResponse = paths["/api/v1/games/genre"]["get"]["responses"][200]["content"]["*/*"];