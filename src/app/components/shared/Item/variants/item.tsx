import { Box, Button } from "@mui/material"
import { CoverItem, ListGames, TypographyItem } from "../components/components"
import { useRef, useState } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { IItemSmallRow, THover } from "../types/item";


export const ItemSmallRow: React.FC<IItemSmallRow> = ({game}) => {
    const price = game.price ? game.price + "" : "free"
    return <Box key={game.id} width={"150px"} height={"220px"} mt={"20px"} sx={{marginRight:"40px !important"}} >
    <CoverItem width={150} link={game.cover_image_url}/>
    <TypographyItem fontSize="17px" whiteSpace="nowrap" text={game.title}  />
    <ListGames amountEl={2}/>
    <Button sx={{width:"100%"}}>{price}</Button>
  </Box>
}

export const ItemSmallColumn: React.FC<IItemSmallRow> = ({game}) => {
    return  <Box width={"95%"}  key={game.id}  borderRadius={"5px"}  display={"flex"}  sx={{marginLeft:"10px !important", backgroundColor:"#000",marginBottom:"20px !important"}} >
    <CoverItem width={170} link={game.cover_image_url}/>
    <Box>
      <TypographyItem mt={"10px"} ml={"10px"} fontSize="17px" whiteSpace="nowrap" text={game.title}  />
      <TypographyItem mt={"5px"} ml={"10px"} fontSize="10px" whiteSpace="nowrap" text={game.title}  />
      <Box mt={"5px"} ml={"10px"}>
        <ListGames amountEl={2}/>
      </Box>
    </Box>
    </Box>
}

export const ItemLargePreview: React.FC<IItemSmallRow> = ({game}) => {
    const [hover, setHover] = useState<THover>(0)
    const nodeRef = useRef(null)
    const price = game && game.price ? game.price + "" : "free"
    return   <Box
    width={"390px"}
    height={"700px"}
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
            <CoverItem width={390} ref={nodeRef} link={game.cover_image_url}  hover={hover} />
          </CSSTransition>
      </TransitionGroup>
    </Box>
    <TypographyItem fontSize="22px"  p={"10px"}  whiteSpace="nowrap" text={game.title}  />
    <TypographyItem mt={"-10px"} p={"10px"}  whiteSpace="normal" fontSize="17px" text={"The Mass Effect™ Legendary Edition includes single-player base content and over 40 DLC from the highly acclaimed Mass Effect, Mass Effect 2, and Mass Effect 3 games, including promo weapons, armors, and packs — remastered and optimized for 4K Ultra HD."}  />
    <TypographyItem mt={"-10px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={"Release Date : 18 Nov, 2023"}  />
    <TypographyItem mt={"-20px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={"Developer and Publisher : Numantian Games"}  />
    <ListGames mt='0px' ml='10px' spacing={1} amountEl={4}/>
    <ListGames mt='0px' ml='10px'   spacing={1} amountEl={3}/>
    <Box  display={"flex"} alignItems={"center"}>
    <TypographyItem mt={"-10px"} p={"10px"} fontSize="17px" whiteSpace="nowrap" text={"MINIMUM"}  />
    <ListGames mt='0px' ml='10px' spacing={1} amountEl={3}/>
    </Box>
    <Box display={"flex"} alignItems={"center"}>
    <TypographyItem mt={"-10px"} p={"10px"}  fontSize="17px" whiteSpace="nowrap" text={"RECOMMENDED"}  />
    <ListGames mt='0px' ml='10px' spacing={1} amountEl={3}/>
    </Box>
    
    <Button sx={{width:"100%", position:"absolute", bottom:"0"}}>{price}</Button>
  </Box>
}