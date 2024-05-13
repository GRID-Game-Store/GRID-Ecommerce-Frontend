import {
  AllReviewsGameResponse,
  FullInfoResponse,
  MyReviewGameResponse,
} from "@/app/types/types";

import { WrapperGamePage } from "./components/wrapper";
import { getAccessToken } from "@/app/utils/sessionTokenAccessor";

//, { cache: 'no-store' }

export async function GetStatusGameInWishlist(url: string) {
  let access_token = await getAccessToken();
  let res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    cache: "no-store",
  });
  if (res.status === 200) {
    return res.json();
  } else {
    return false;
  }
}

export async function getData(url: string) {
  let access_token = await getAccessToken();
  
  if (access_token) {
    let res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      cache: "no-store",
    });
    if (res.status === 404) {
      return [];
    } else {
      return res.json();
    }
  }
  
  

  if (!access_token) {
    let res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) {
      return [];
    } else {
      return res.json();
    }
  }
}

export default async function Game(props: { params: { id: number } }) {
  const fullInfo: FullInfoResponse = await getData(
    `${process.env.URL}games/${props.params.id}`
  );
  
  const wishlistCheck: boolean = await GetStatusGameInWishlist(
    `${process.env.URL}wishlist/check/${props.params.id}`
  );
  const myReview: MyReviewGameResponse = await getData(
    `${process.env.URL}reviews/get/${props.params.id}`
  );
  const AllReviews: AllReviewsGameResponse = await getData(
    `${process.env.URL}reviews/${props.params.id}`
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
      <WrapperGamePage
        fullInfo={fullInfo.game}
        wishListCheck={wishlistCheck}
        ownedByCurrentUser={fullInfo?.ownedByCurrentUser}
        myReview={myReview}
        allReviews={AllReviews}
      />
    </main>
  );
}
