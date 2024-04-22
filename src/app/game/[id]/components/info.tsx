"use client";
import React from "react";
import { ListTagsOrGenres } from "@/app/components/shared/Item/components/components";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useAddGameToCartMutation,
  useAddGameWishlistMutation,
} from "../api/query";
import { getMargins } from "../utils/margin";
import { getPrice } from "@/app/components/shared/Item/variants/item";
import { getDeveloperAndPublisher } from "../utils/developerAndPublisher";
import { getPlatforms } from "../utils/platforms";
import { IInfoProps } from "../types/game";
import Image from "next/image";
import { ArrowDownRight, Heart } from "lucide-react";
import {
  BuyButtonStateBuy,
  BuyButtonStateWishlist,
} from "../utils/buttonState";

const Rating = ({ permit_age }: { permit_age: string }) => {
  return (
    <>
      <Typography fontWeight={"600"} variant="h5">
        Rating for: PEGI
      </Typography>
      <Image
        width={70}
        height={80}
        src={`https://pegi.info/themes/pegi/public-images/pegi/pegi${permit_age}.png`}
        alt="pegi"
      />
    </>
  );
};


export const Info: React.FC<IInfoProps> = ({ fullInfo, wishListCheck }) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const router = useRouter();
  const { mutate, isSuccess, isPending, data } = useAddGameToCartMutation(
    fullInfo.id
  );
  const {
    mutate: mutateWishlist,
    isSuccess: isSuccessWishlist,
    isPending: isPendingWishlist,
    data: dataWishlist,
  } = useAddGameWishlistMutation(fullInfo.id);
  const { ml, mr, mt } = getMargins(matches);
  const price = getPrice(fullInfo.price);
  const platforms = getPlatforms(fullInfo.platforms);
  const developerAndPublisher = getDeveloperAndPublisher(fullInfo);
  const firstGenre =
    fullInfo.genres && fullInfo.genres[0] ? fullInfo.genres[0].name : "";
  const secondGenre =
    fullInfo.genres && fullInfo.genres[1] ? fullInfo.genres[1].name : "";
  const genres = `${firstGenre} ${secondGenre}`;

  const onAddToCart = () => {
    mutate();
    router.refresh();
  };
  const onAddWishlist = () => {
    mutateWishlist();
    router.refresh();
  };

  const { message: buyButtonStateMessage, disabled: buyButtonStateDisabled } =
    BuyButtonStateBuy(isSuccess, isPending, data, data?.error, price);

  const {
    message: wishlistButtonStateMessage,
    disabled: wishlistButtonStateDisabled,
  } = BuyButtonStateWishlist(
    isSuccessWishlist || wishListCheck,
    isPendingWishlist,
    dataWishlist?.data?.error
  );
  return (
    <Box ml={ml} mt={mt} mr={mr}>
      <Typography fontWeight={"600"} variant="h3">
        {fullInfo.title}
      </Typography>
      <Typography width={"390px"}>{fullInfo.description}</Typography>
      <Typography fontWeight={"600"} variant="h6">
        Release date: {fullInfo.releaseDate}{" "}
      </Typography>
      <Typography
        fontWeight={"600"}
        variant="h6"
      >{`Developer & Publisher : ${developerAndPublisher}`}</Typography>
      <Typography
        fontWeight={"600"}
        variant="h6"
      >{`System Support : ${platforms}`}</Typography>
      <Typography
        fontWeight={"600"}
        variant="h6"
      >{`Genre : ${genres}`}</Typography>
      {fullInfo.tags && (
        <ListTagsOrGenres
          mt="0px"
          ml="-5px"
          spacing={0}
          arrayElements={fullInfo.tags}
        />
      )}

      {fullInfo.permitAge && <Rating permit_age={fullInfo.permitAge} />}
      <Box display={"flex"}>
        <Button
          disabled={buyButtonStateDisabled}
          onClick={onAddToCart}
          sx={{
            width: "100%",
            fontSize: "20px",
            pr: "10px",
            pl: "10px",
            mr: "5px",
            height: "50px",
          }}
        >
          {buyButtonStateMessage}
        </Button>
        <Button
          disabled={wishlistButtonStateDisabled}
          onClick={onAddWishlist}
          sx={{ height: "50px" }}
        >
          {wishlistButtonStateMessage}
        </Button>
      </Box>
    </Box>
  );
};
