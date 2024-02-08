"use client"
import { Box, useMediaQuery } from "@mui/material"
import { SysReq } from "./sysReq"
import { Gallery } from "./galary"
import { Info } from "./info"
import { ResponseGameFullInfo } from "@/app/components/main/types/Response"
interface IWrapperGamePageProps {
    fullInfo : ResponseGameFullInfo
} 
const WrapperGamePage : React.FC<IWrapperGamePageProps> = ({fullInfo}) => {
    const matches = useMediaQuery('(min-width:1200px)');
    const alignItems = !matches ? "center" : undefined
    const flexDirection = !matches ? "column" : "row"
    return <>
            <Box display={"flex"} flexDirection={flexDirection} justifyContent={"center"} alignItems={alignItems}>
                <Gallery gameMedia={fullInfo.game_media}/>
                <Info fullInfo={fullInfo}/>
            </Box>
            <SysReq sysReq={fullInfo.system_requirements}/>
        </>
}


export {WrapperGamePage}