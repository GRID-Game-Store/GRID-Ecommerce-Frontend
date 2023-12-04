
"use client"
import { gameMedia } from "@/app/components/main/types/Response"
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface IGalleryProps  {
    gameMedia: gameMedia
}


const Preview = ({isVideo, src, ref} : {isVideo: number, src: string, ref?: any  }) => {
    if(isVideo === 1){
        return <video ref={ref} width={840} height={490} controls muted autoPlay style={{borderRadius:"13px", marginBottom:"20px"}} src={src}/>
    }else {
        return <img ref={ref} width={840} height={490}   style={{borderRadius:"5px", marginBottom:"20px"}}  src={src} alt=""  />
    }
}

const Item = ({src, setIsPreview, index, additionSrc = src} : {src: string, setIsPreview: (object: any) => void , index: number, additionSrc?: string  }) => {
    return <button style={{background:"none", outline:"none", boxShadow:"none"}} onClick={()=> setIsPreview({src: additionSrc, isVideo: index})}>
    <img width={180}  style={{borderRadius:"5px"}} src={src} alt=""  />
</button>
}

export const Gallery: React.FC<IGalleryProps> = ({gameMedia}) => {
    const [isPreview, setIsPreview ] = useState({
        src: gameMedia.trailer,
        isVideo: 1
    })

    const positionIndicator = isPreview.isVideo === 0 ? -8 : isPreview.isVideo * 180 + (isPreview.isVideo-1) * 8
    const nodeRef = useRef(null)
    return <Box  position={"relative"}>
        <TransitionGroup >
          <CSSTransition  key={isPreview.isVideo} timeout={300} classNames="changeSlide">
            <Box maxWidth={840}   position={"relative"} >
                <Preview ref={nodeRef} src={isPreview.src} isVideo={isPreview.isVideo} />
            </Box>   
          </CSSTransition>
      </TransitionGroup>
        <Stack direction={"row"} spacing={1} sx={{position:"relative"}} >
            <Item src={gameMedia.banner_url} setIsPreview={setIsPreview} index={0}/>
            <Item src={gameMedia.trailer_screenshot} additionSrc={gameMedia.trailer} setIsPreview={setIsPreview} index={1}/>
            <Item src={gameMedia.screenshot_url} setIsPreview={setIsPreview} index={2}/>
            <span className="MuiTabs-indicator mui-1u4qj0q-MuiTabs-indicator" style={{width:"180px", position:"absolute", left:`${positionIndicator}px`, bottom:"-10px"}} ></span>
        </Stack>
    </Box>
}