
import { Payment } from '@/app/components/shared/payment/payment';
import {
  Container,
  Typography,
} from '@mui/material';




export default async function Home({ params }: any) {
    return (
      <main style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"100vh"}}>
        <Payment/>
      </main>
    )
  }
  