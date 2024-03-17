import { FullInfoResponse } from '@/app/types/types';

import { WrapperGamePage } from './components/wrapper';

//, { cache: 'no-store' }

export async function getData(url:string) {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home(props: { params: { id: number } }) {
  const fullInfo : FullInfoResponse  = await getData(`${process.env.URL}games/${props.params.id}`)
 
  
  return (
    <main  style={{display:"flex", justifyContent:"start", marginTop:"100px", flexDirection:"column"}}>
        <WrapperGamePage fullInfo={fullInfo}/>
    </main>
  )
}
