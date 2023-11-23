import styles from './page.module.css'
import { Main } from './components/main/main'
import { AMOUNT_SLIDES } from './constants/slider'
import { IAllGenres, ResponseGamePopular, ResponseGameRandom } from './components/main/types/Response'

//, { cache: 'no-store' }

export async function getData(url:string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const slides : Array<ResponseGamePopular>  =  await getData(`${process.env.URL}games/popular?qty=${AMOUNT_SLIDES}`)
  const recommendations : Array<ResponseGameRandom>  = await getData(`${process.env.URL}games/random`)
  const byGenre : Array<ResponseGameRandom>  = await getData(`${process.env.URL}games/genre?genre=Action&qty=${AMOUNT_SLIDES}`)
  const allGenres : Array<IAllGenres>  = await getData(`${process.env.URL}genres`)
  return (
    <main className={styles.main}>
        <Main slides={slides} recommendations={recommendations} byGenre={byGenre}  />
    </main>
  )
}
