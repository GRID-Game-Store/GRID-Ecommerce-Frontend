import styles from './page.module.css'
import { Main } from './components/main/main'
import { AMOUNT_SLIDES } from './constants/slider'
import { IAllGenres, ResponseGamePopular, ResponseGameRandom } from './components/main/types/Response'

//

export async function getData(url:string) {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}


export default async function Home() {
  const slides : Array<ResponseGamePopular>  =  await getData(`${process.env.URL}games/popular?qty=${AMOUNT_SLIDES}`)
  const recommendations : Array<ResponseGameRandom>  = await getData(`${process.env.URL}games/random`)
  const allGenres : Array<IAllGenres>  = await getData(`${process.env.URL}genres`)
  const randomGenres = getRandomIntInclusive(0 , allGenres.length)
  const byGenre : Array<ResponseGameRandom>  = await getData(`${process.env.URL}games/genre?genre=${allGenres[randomGenres].name}&qty=${AMOUNT_SLIDES}`)
  
  
  
  return (
    <main className={styles.main}>
        <Main slides={slides} recommendations={recommendations} byGenre={byGenre} genreTitle={allGenres[randomGenres].name}  />
    </main>
  )
}
