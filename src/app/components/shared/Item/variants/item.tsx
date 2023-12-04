import { Box, Button } from "@mui/material"
import { CoverItem, ListTagsOrGenres, TypographyItem } from "../components/components"
import { useRef, useState } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {IItem, IItemLargePreview, THover } from "../types/item";
import Link from 'next/link'
export const ItemSmallRow: React.FC<IItem> = ({game}) => {
    const price = game.price ? game.price + "" : "free"
    return <Box key={game.id} width={"150px"} height={"220px"} mt={"20px"} sx={{marginRight:"40px !important"}} >
    <CoverItem width={150} linkCoverImg={game.cover_image_url}/>
    <TypographyItem fontSize="17px" whiteSpace="nowrap" text={game.title}  />
    <ListTagsOrGenres arrayElements={game.genres} spaceBetween />
    <Button sx={{width:"100%"}}>{price}</Button>
  </Box>
}

export const ItemSmallColumn: React.FC<IItem> = ({game, setActiveHover}) => {
    return  <Box width={"95%"} onMouseEnter={() =>  setActiveHover && setActiveHover()}  key={game.id}  borderRadius={"5px"}  display={"flex"}  sx={{marginLeft:"10px !important", backgroundColor:"#000",marginBottom:"20px !important"}} >
    <CoverItem width={170} linkCoverImg={game.cover_image_url}/>
    <Box>
      <TypographyItem mt={"10px"} ml={"10px"} fontSize="17px" whiteSpace="nowrap" text={game.title} link={`/game/${game.id}`}  />
      <Box width={"280px"}>
        <TypographyItem  mt={"5px"} ml={"10px"} fontSize="10px" whiteSpace="nowrap" text={game.description}  />
      </Box>
      <Box mt={"5px"} ml={"10px"}>
        <ListTagsOrGenres arrayElements={game.genres.slice(game.genres.length-3)} />
      </Box>
    </Box>
    </Box>
}

export const ItemLargePreview: React.FC<IItemLargePreview> = ({game}) => {
    const [hover, setHover] = useState<THover>(0)
    const nodeRef = useRef(null)
    const price = game && game.price ? game.price + "" : "free"
    const developerAndPublisher = game  && game.developer.name === game.publisher.name ?  game.developer.name : game  && `${game.developer.name} & ${game.publisher.name}`
    return   <Box
    width={"390px"}
    height={"650px"}
    bgcolor={"#0a0a0adb"}
    overflow={"hidden"}
    position={"relative"}
    ml={"20px"}
    borderRadius={"5px"}
    onMouseEnter={() => setHover && setHover(1)}
    onMouseLeave={() => setHover && setHover(0)}
    > 
    <Box width={390} height={223}>
      <TransitionGroup>
          <CSSTransition key={hover} timeout={500} classNames="item">
            <CoverItem width={390} ref={nodeRef} linkCoverImg={game.game_media.banner_url} linkCoverVideo={game.game_media.trailer}  hover={hover} />
          </CSSTransition>
      </TransitionGroup>
    </Box>
    <TypographyItem fontSize="22px"  p={"10px"}  whiteSpace="nowrap" text={game.title}  />
    <TypographyItem mt={"-10px"} p={"10px"}  whiteSpace="normal" fontSize="17px" text={game.description}  />
    <TypographyItem mt={"-10px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={`Release Date : ${game.release_date}`}  />
    <TypographyItem mt={"-20px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={`Developer & Publisher : ${developerAndPublisher}`}  />
    <ListTagsOrGenres  mt='0px' ml='10px' spacing={0} arrayElements={(game.genres.concat(game.tags)).slice(13)}/>
    <Button sx={{width:"100%", position:"absolute", bottom:"0"}}>{price}</Button>
  </Box>
}