import { Box, Typography } from '@mui/material'
import { Gallery } from './components/galary'
import styles from './page.module.css'
import { Info } from './components/info'
import { ResponseGameFullInfo } from '@/app/components/main/types/Response'
import { SysReq } from './components/sysReq'
import { WrapperGamePage } from './components/wrapper'


//, { cache: 'no-store' }

export async function getData(url:string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home(props: { params: { id: number } }) {
  const fullInfo : ResponseGameFullInfo  = await getData(`${process.env.URL}games/${props.params.id}`)
 
  return (
    <main  style={{display:"flex", justifyContent:"start", marginTop:"100px", flexDirection:"column"}}>
        <WrapperGamePage fullInfo={fullInfo}/>
    </main>
  )
}
