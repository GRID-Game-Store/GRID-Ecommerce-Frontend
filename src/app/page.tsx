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
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getData(url: string, session: any) {
  if (session) {
    let access_token = await getAccessToken(session);
    let res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      cache: "no-store",
    });

    return res.json();
  } else {
    let res = await fetch(url, { cache: "no-store" });
    return res.json();
  }
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const slides: PopularResponse = await getData(
    `${process.env.URL}games/popular?qty=${AMOUNT_SLIDES}`,
    session
  );
  const recommendations: RandomResponse = await getData(
    `${process.env.URL}games/random`,
    session
  );
  const allGenres: AllGenreResponse = await getData(
    `${process.env.URL}genres`,
    session
  );
  const randomGenres: number = getRandomIntInclusive(0, allGenres.length - 1);
  const byGenre: ByGenreResponse = await getData(
    `${process.env.URL}games/genre?genre=${allGenres[randomGenres].name}&qty=${AMOUNT_SLIDES}`,
    session
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
