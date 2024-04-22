import styles from "./page.module.css";
import { Main } from "./components/main/main";
import { AMOUNT_SLIDES } from "./constants/slider";
import {
  AllGenreResponse,
  ByGenreResponse,
  PopularResponse,
  RandomResponse,
} from "./types/types";
import { getAccessToken } from "./utils/sessionTokenAccessor";

export async function getData(url: string) {
  let access_token = await getAccessToken();
  console.log(access_token);
  
  let res = await fetch(url, { 
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    cache: "no-store"
   });
  if (!res.ok) {
      res = await fetch(url, {cache: "no-store"})
  }
  return res.json();
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function Home() {
  const slides: PopularResponse = await getData(
    `${process.env.URL}games/popular?qty=${AMOUNT_SLIDES}`,
  );
  const recommendations: RandomResponse = await getData(
    `${process.env.URL}games/random`,
  );
  const allGenres: AllGenreResponse = await getData(`${process.env.URL}genres`);
  const randomGenres: number = getRandomIntInclusive(0, allGenres.length - 1);
  const byGenre: ByGenreResponse = await getData(
    `${process.env.URL}games/genre?genre=${allGenres[randomGenres].name}&qty=${AMOUNT_SLIDES}`,
  );

  return (
    <main className={styles.main}>
      <Main
        slides={slides}
        recommendations={recommendations}
        byGenre={byGenre}
        genreTitle={allGenres[randomGenres].name}
      />
    </main>
  );
}
