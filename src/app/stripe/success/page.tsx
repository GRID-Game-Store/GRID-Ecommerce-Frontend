import { Payment } from "@/app/components/shared/payment/payment";
export default async function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Payment />
    </main>
  );
}
