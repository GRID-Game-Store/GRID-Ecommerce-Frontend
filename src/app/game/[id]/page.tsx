import { Box, Typography } from '@mui/material'
import { Gallery } from './components/galary'
import styles from './page.module.css'
import { Info } from './components/info'
import { ResponseGameFullInfo } from '@/app/components/main/types/Response'
import { SysReq } from './components/sysReq'


//, { cache: 'no-store' }

export async function getData(url:string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home(props: { params: { id: number } }) {

  console.log(props.params.id);
  
  const fullInfo : ResponseGameFullInfo  = await getData(`${process.env.URL}games/${props.params.id}`)
 
  return (
    <main  style={{display:"flex", justifyContent:"center", marginTop:"70px", flexDirection:"column"}}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
          <Gallery gameMedia={fullInfo.game_media}/>
          <Info fullInfo={fullInfo}/>
        </Box>
        <SysReq sysReq={fullInfo.system_requirements}/>
    </main>
  )
}
