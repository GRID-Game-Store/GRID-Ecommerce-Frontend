"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Badge, Box, Button, Chip, Stack, useMediaQuery } from "@mui/material";

import {
  ButtonBuy,
  CoverItem,
  ItemLargePreviewAnimation,
  ItemLargePreviewWrapper,
  ListTagsOrGenres,
  TypographyItem,
} from "../components/components";
import { IItem, IItemLargePreview, IItemPlay, THover } from "../types/item";
import { ActionsButtons } from "@/app/cart/components/actionsButton";
import { UAH } from "../../currency/UAH";
import { usePathname, useRouter } from "next/navigation";
import { BadgeInfo, Hotel } from "lucide-react";
import { getBtnBackgroundColor } from "../utils/btnColor";

export const getPrice = (price: number | undefined) => {
  return price !== undefined && price ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      {price}
      <UAH />
    </div>
  ) : (
    "free"
  );
};

export const ItemSmallRow: React.FC<IItem> = ({ game }) => {
  const price = getPrice(game.price);
  const matches = useMediaQuery("(min-width:1200px)");
  const width = matches ? "150px" : "132px";
  return (
    <Box
      key={game.id}
      width={width}
      height={"220px"}
      mt={"20px"}
      position={"relative"}
      sx={{ marginRight: "40px !important" }}
    >
      <Badge
        color="warning"
        badgeContent={game.discount ? `${game.discount}%` : 0}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ flexDirection: "column" }}
      >
        <CoverItem
          width={150}
          linkCoverImg={game.coverImageUrl}
          isOwned={game.ownedByCurrentUser}
          idGame={game.id}
        />
      </Badge>
      <TypographyItem
        fontSize="17px"
        whiteSpace="nowrap"
        text={game.title}
        link={`/game/${game.id}`}
      />
      <ListTagsOrGenres arrayElements={game.genres} spaceBetween />
      <Link href={`/game/${game.id}`} style={{ color: "#fff" }}>
        <Button sx={{ width: "100%", backgroundColor: getBtnBackgroundColor(game.discount) }}>
          {price}
        </Button>
      </Link>
    </Box>
  );
};
export const ItemSmallRowForPlay: React.FC<IItemPlay> = ({
  game,
  purchaseDate,
  playtime,
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const width = matches ? "315px" : "132px";
  return (
    <Box
      key={game.id}
      width={width}
      height={"220px"}
      mt={"20px"}
      sx={{ marginRight: "40px !important", position: "relative" }}
    >
      <Box
        sx={{
          "&:before": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            zIndex: "1",
            opacity: "0.6",
          },
        }}
      >
        <CoverItem
          width={315}
          linkCoverImg={game.coverImageUrl}
          isOwned={game.ownedByCurrentUser}
          idGame={game.id}
        />
      </Box>
      <Box position={"absolute"} bottom={"80px"} left={"10px"} zIndex={2}>
        <TypographyItem
          fontSize="17px"
          whiteSpace="normal"
          text={game.title}
          link={`/game/${game.id}`}
        />
        <Stack direction={"row"} spacing={1}>
          <Chip label={purchaseDate} sx={{ fontSize: "10px" }} />
          <Chip label={`Play time ${playtime}`} sx={{ fontSize: "10px" }} />
        </Stack>
      </Box>
    </Box>
  );
};

export const ItemSmallColumnForSearch: React.FC<IItem> = ({
  game,
  setActiveHover,
}) => {
  const price = getPrice(game.price);
  return (
    <Box
      width={"95%"}
      onMouseEnter={() => setActiveHover && setActiveHover()}
      key={game.id}
      borderRadius={"5px"}
      display={"flex"}
      sx={{
        marginLeft: "12px !important",
        backgroundColor: "#000",
        marginBottom: "20px !important",
      }}
      alignItems={"center"}
    >
      <Badge
        color="warning"
        badgeContent={game.discount ? `${game.discount}%` : 0}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ flexDirection: "column" }}  
      >
      <CoverItem
        width={144}
        minHeight={70}
        linkCoverImg={game.coverImageUrl}
        isOwned={game.ownedByCurrentUser}
        idGame={game.id}
      />
      </Badge>
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
        <TypographyItem
          ml={"10px"}
          fontSize="14px"
          whiteSpace="normal"
          text={game.title}
          link={`/game/${game.id}`}
        />
        <Box width={"210px"}>
          <TypographyItem
            ml={"10px"}
            fontSize="12px"
            whiteSpace="nowrap"
            text={game.description}
          />
        </Box>
        <Box
          mt={"1px"}
          ml={"10px"}
          width={"120px"}
          height={"30px"}
          position={"relative"}
        >
          <ButtonBuy price={price} href={`/game/${game.id}`} discount={game.discount} />
        </Box>
      </Box>
    </Box>
  );
};

export const ItemSmallColumn: React.FC<IItem> = ({
  game,
  setActiveHover,
  isCart,
  cartId,
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const price = getPrice(game.price);
  const path = usePathname();
  const widthBlockInCart = !isCart ? "280px" : "650px";
  const { push } = useRouter();
  const isAllGames = path === "/games";
  return (
    <Box
      width={"95%"}
      onMouseEnter={() => setActiveHover && setActiveHover()}
      onClick={() => push(`/game/${game.id}`)}
      key={game.id}
      borderRadius={"5px"}
      display={"flex"}
      alignItems={"center"}
      sx={{
        marginLeft: "10px !important",
        backgroundColor: "#000",
        marginBottom: "20px !important",
        position: "relative",
      }}
    >
      <Badge
       color="warning"
       badgeContent={game.discount ? `${game.discount}%` : 0}
       anchorOrigin={{ horizontal: "left", vertical: "top" }}
       sx={{ flexDirection: "column" }}
      >
      <CoverItem
        width={170}
        linkCoverImg={game.coverImageUrl}
        labelOwnerGame="right"
        isOwned={game.ownedByCurrentUser}
        idGame={game.id}
      />
      </Badge>
      <Box>
        <TypographyItem
          mt={"10px"}
          ml={"10px"}
          fontSize="17px"
          whiteSpace="normal"
          text={game.title}
          link={`/game/${game.id}`}
        />

        {matches && (
          <>
            <Box width={widthBlockInCart}>
              <TypographyItem
                mt={"5px"}
                ml={"10px"}
                fontSize="10px"
                whiteSpace="nowrap"
                text={game.description}
              />
            </Box>

            {matches && (
              <Box
                width={"100%"}
                mt={"5px"}
                ml={"10px"}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
                alignItems={"flex-start"}
              >
                <ListTagsOrGenres
                  arrayElements={
                    game.genres && game.genres.slice(game.genres.length - 3)
                  }
                />
                {isCart && (
                  <ActionsButtons
                    cost={game.price}
                    cartId={cartId || game.id}
                  />
                )}
              </Box>
            )}
          </>
        )}
      </Box>
      {isAllGames && (
        <Link href={`/game/${game.id}`} style={{ color: "#fff" }}>
          <Button
            sx={{
              width: "150px",
              position: "absolute",
              right: "10px",
              bottom: "20px",
              backgroundColor: getBtnBackgroundColor(game.discount),
            }}
          >
            {price} 
          </Button>
        </Link>
      )}
    </Box>
  );
};

export const ItemLargePreview: React.FC<IItemLargePreview> = ({
  game,
  width = "390px",
}) => {
  const [hover, setHover] = useState<THover>(0);
  const price = getPrice(game?.price);

  const developerAndPublisher =
    game && game.developer && game.developer.name === game.publisher.name
      ? game.developer.name
      : game && `${game.developer.name} & ${game.publisher.name}`;
  return (
    <ItemLargePreviewWrapper width={width} setHover={setHover}>
      <ItemLargePreviewAnimation hover={hover}>
        <CoverItem
          width={390}
          linkCoverImg={game?.gameMedia?.bannerUrl}
          linkCoverVideo={game?.gameMedia?.trailer}
          hover={hover}
          idGame={game?.id}
        />
      </ItemLargePreviewAnimation>
      <TypographyItem
        fontSize="22px"
        p={"10px"}
        whiteSpace="nowrap"
        text={game?.title}
        link={`/game/${game?.id}`}
      />
      <TypographyItem
        mt={"-10px"}
        p={"10px"}
        whiteSpace="normal"
        fontSize="17px"
        text={game?.description}
      />
      <TypographyItem
        mt={"-10px"}
        p={"10px"}
        fontSize="17px"
        whiteSpace="nowrap"
        text={`Release Date : ${game?.releaseDate}`}
      />
      <TypographyItem
        mt={"-20px"}
        p={"10px"}
        fontSize="17px"
        whiteSpace="nowrap"
        text={`Developer & Publisher : ${developerAndPublisher}`}
      />
      <ListTagsOrGenres
        mt="0px"
        ml="10px"
        spacing={0}
        arrayElements={
          game?.tags && game?.genres && game.genres.concat(game.tags).slice(13)
        }
      />
      <Link href={`/game/${game?.id}`} style={{ color: "#fff" }}>
        <Button sx={{ width: "100%", position: "absolute", bottom: 0, background: getBtnBackgroundColor(game?.discount), }}>
          {price}
        </Button>
      </Link>
    </ItemLargePreviewWrapper>
  );
};
