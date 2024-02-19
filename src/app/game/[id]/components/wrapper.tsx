"use client"
import { FullInfoResponse } from '@/app/types/types';
import {
  Box,
  useMediaQuery,
} from '@mui/material';

import { Gallery } from './galary';
import { Info } from './info';
import { SysReq } from './sysReq';
import getQueryClient from '@/app/reactQuery/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '@/app/reactQuery/Hydrate';

interface IWrapperGamePageProps {
    fullInfo : FullInfoResponse
} 
const WrapperGamePage : React.FC<IWrapperGamePageProps> = ({fullInfo}) => {
    const matches = useMediaQuery('(min-width:1200px)');
    const alignItems = !matches ? "center" : undefined
    const flexDirection = !matches ? "column" : "row"
    const queryClient = getQueryClient();
    const dehydratedState = dehydrate(queryClient);
    return <>
            <Box display={"flex"} flexDirection={flexDirection} justifyContent={"center"} alignItems={alignItems}>
                <Gallery gameMedia={fullInfo.gameMedia}/>
                <Hydrate state={dehydratedState}>
                    <Info fullInfo={fullInfo}/>  
                </Hydrate>
            </Box>
           {fullInfo.systemRequirements && <SysReq sysReq={fullInfo.systemRequirements}/>}
        </>
}

export { WrapperGamePage };