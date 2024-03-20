"use client";
import React from "react";
import { ListTagsOrGenres } from "@/app/components/shared/Item/components/components";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAddGameToCartQuery } from "../api/query";
import { getMargins } from "../utils/margin";
import { getPrice } from "@/app/components/shared/Item/variants/item";
import { getDeveloperAndPublisher } from "../utils/developerAndPublisher";
import { getPlatforms } from "../utils/platforms";
import { IInfoProps } from "../types/game";
import Image from "next/image";

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

export const Info: React.FC<IInfoProps> = ({ fullInfo }) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const router = useRouter();
  const { isSuccess, data, isFetched, isLoading, refetch } =
    useAddGameToCartQuery(fullInfo.id);
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
    refetch();
    router.refresh();
  };
  const BuyButtonState = () => {
    if (isSuccess)
      return {
        message: data.data.response || data.error,
        disabled: true,
      };
    else if (isFetched || isLoading)
      return {
        message: "Loading...",
        disabled: true,
      };
    else
      return {
        message: price,
        disabled: false,
      };
  };

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
          arrayElements={fullInfo.tags.sort().slice(0, 4)}
        />
      )}
      {fullInfo.permitAge && <Rating permit_age={fullInfo.permitAge} />}
      <Button
        disabled={BuyButtonState().disabled}
        onClick={onAddToCart}
        sx={{ width: "100%", fontSize: "20px" }}
      >
        {BuyButtonState().message}
      </Button>
    </Box>
  );
};
