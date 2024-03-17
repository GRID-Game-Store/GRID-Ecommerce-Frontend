import { PaymentCancel } from "@/app/components/shared/payment/paymentCancel";





export default async function Home() {
    return (
      <main style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"100vh"}}>
        <PaymentCancel/>
      </main>
    )
  }
  