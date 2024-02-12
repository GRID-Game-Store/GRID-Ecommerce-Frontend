import { Box, Button, useMediaQuery } from "@mui/material"
import { ButtonBuy, CoverItem, ItemLargePreviewAnimation, ItemLargePreviewWrapper, ListTagsOrGenres, TypographyItem } from "../components/components"
import { useState } from "react"
import {IItem, IItemLargePreview, THover } from "../types/item";
import Link from "next/link";


const getPrice = (price: number | undefined) => {
    const currency = ""
    return price != undefined && price ? price + currency : "free"
}


export const ItemSmallRow: React.FC<IItem> = ({game}) => {
    const price = game.price ? game.price + "" : "free"
    const matches = useMediaQuery('(min-width:1200px)');
    const width = matches ? "150px" : "132px"
    return <Box key={game.id} width={width} height={"220px"} mt={"20px"} sx={{marginRight:"40px !important"}} >
    <CoverItem width={150}  linkCoverImg={game.coverImageUrl}/>
    <TypographyItem fontSize="17px" whiteSpace="nowrap" text={game.title} link={`/game/${game.id}`} />
    <ListTagsOrGenres arrayElements={game.genres} spaceBetween />
    <Link href={`/game/${game.id}`} style={{color:"#fff"}}>
        <Button sx={{width:"100%"}}>{price}</Button>
    </Link>
  </Box> 
}

export const ItemSmallColumnForSearch: React.FC<IItem> = ({game, setActiveHover}) => {
  
  const price = getPrice(game.price)
  return  <Box width={"95%"}  onMouseEnter={() =>  setActiveHover && setActiveHover()}  key={game.id}  borderRadius={"5px"}  display={"flex"}  sx={{marginLeft:"12px !important", backgroundColor:"#000",marginBottom:"20px !important", }} alignItems={"center"}>
  <CoverItem width={144} minHeight={70} linkCoverImg={game.coverImageUrl}/>
  <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} >
    <TypographyItem  ml={"10px"}  fontSize="14px" whiteSpace="normal" text={game.title} link={`/game/${game.id}`}  />
    <Box width={"210px"}>
      <TypographyItem  ml={"10px"} fontSize="12px" whiteSpace="nowrap" text={game.description}  />
    </Box>
    <Box mt={"1px"} ml={"10px"} width={"120px"} height={"30px"} position={"relative"}>
      <ButtonBuy price={price} href={`game/${game.id}`}/>
    </Box>
  </Box>
  </Box>
}





export const ItemSmallColumn: React.FC<IItem> = ({game, setActiveHover}) => {
  const matches = useMediaQuery('(min-width:1200px)');
  const price = getPrice(game.price)
    return  <Box width={"95%"}  onMouseEnter={() =>  setActiveHover && setActiveHover()}  key={game.id}  borderRadius={"5px"}  display={"flex"}  sx={{marginLeft:"10px !important", backgroundColor:"#000",marginBottom:"20px !important",}} >
    <CoverItem width={170} linkCoverImg={game.coverImageUrl}/>
    <Box position={"relative"} >
      <TypographyItem mt={"10px"} ml={"10px"} fontSize="17px" whiteSpace="normal" text={game.title} link={`/game/${game.id}`}  />
      {matches && 
      <>
      <Box width={"280px"}>
        <TypographyItem  mt={"5px"} ml={"10px"} fontSize="10px" whiteSpace="nowrap" text={game.description}  />
      </Box>
      {matches && <Box mt={"5px"} ml={"10px"}>
        <ListTagsOrGenres arrayElements={game.genres && game.genres.slice(game.genres.length-3)} />
      </Box>}
      </>
      }
      {!matches && <Link href={`/game/${game.id}`} style={{color:"#fff"}}>
        <Button sx={{mt:"10px", ml:"10px", width:"150px"}}>{price}</Button>
    </Link>}
    </Box>
    </Box>
}

export const ItemLargePreview: React.FC<IItemLargePreview> = ({game, width="390px"}) => {
    const [hover, setHover] = useState<THover>(0)
    const price = getPrice(game.price)
    const developerAndPublisher = game &&  game.developer  && game.developer.name === game.publisher.name ?  game.developer.name : game  && `${game.developer.name} & ${game.publisher.name}`
    return <ItemLargePreviewWrapper width={width} setHover={setHover} >
    <ItemLargePreviewAnimation hover={hover}>
          <CoverItem width={390}  linkCoverImg={game.gameMedia?.bannerUrl} linkCoverVideo={game.gameMedia?.trailer}  hover={hover} />
    </ItemLargePreviewAnimation>
    <TypographyItem fontSize="22px"  p={"10px"}  whiteSpace="nowrap" text={game.title} link={`/game/${game.id}`} />
    <TypographyItem mt={"-10px"} p={"10px"}  whiteSpace="normal" fontSize="17px" text={game.description}  />
    <TypographyItem mt={"-10px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={`Release Date : ${game.releaseDate}`}  />
    <TypographyItem mt={"-20px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={`Developer & Publisher : ${developerAndPublisher}`}  />
    <ListTagsOrGenres  mt='0px' ml='10px' spacing={0} arrayElements={ game.tags && game.genres && game.genres.concat(game.tags).slice(13)}/>
    <Link href={`/game/${game.id}`} style={{color:"#fff"}}>
        <Button sx={{width:"100%",position:"absolute", bottom:0}}>{price}</Button>
    </Link>
  </ItemLargePreviewWrapper>
}