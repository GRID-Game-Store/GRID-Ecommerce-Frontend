import { FullInfoResponse } from "@/app/types/types";

import { WrapperGamePage } from "./components/wrapper";
import { getAccessToken } from "@/app/utils/sessionTokenAccessor";

//, { cache: 'no-store' }

export async function getData(url: string) {
  let access_token = await getAccessToken();
  let res = await fetch(url, { 
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    cache: "no-store"
   });
  if (!res.ok) {
      res = await fetch(url, {cache: "no-store"})
  }
  return res.json();
}

export default async function Game(props: { params: { id: number } }) {
  const fullInfo: FullInfoResponse = await getData(
    `${process.env.URL}games/${props.params.id}`,
  );

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "start",
        marginTop: "100px",
        flexDirection: "column",
      }}
    >
      <WrapperGamePage fullInfo={fullInfo} />
    </main>
  );
}
