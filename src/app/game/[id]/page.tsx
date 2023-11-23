import { Typography } from '@mui/material'
import { Gallery } from './components/galary'
import styles from './page.module.css'
import { Info } from './components/info'


//, { cache: 'no-store' }

export async function getData(url:string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  
 
  return (
    <main  style={{display:"flex", justifyContent:"center"}}>
        <Gallery/>
        <Info/>
    </main>
  )
}
