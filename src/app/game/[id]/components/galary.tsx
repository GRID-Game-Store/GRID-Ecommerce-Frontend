import { Box, Stack, Typography } from "@mui/material"



export const Gallery = () => {
    return <Box>
        <video controls muted style={{borderRadius:"5px"}} src="https://cdn.cloudflare.steamstatic.com/steam/apps/256961600/movie480_vp9.webm?t=1695393579"></video>
        <Stack direction={"row"} spacing={1} >
            <img width={180} style={{borderRadius:"5px"}}  src="https://cdn.cloudflare.steamstatic.com/steam/apps/256961600/movie.293x165.jpg?t=1695393579" alt=""  />
            <img width={180} style={{borderRadius:"5px"}}  src="https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.600x338.jpg?t=1696948801" alt=""  />
            <img width={180} style={{borderRadius:"5px"}} src="https://cdn.cloudflare.steamstatic.com/steam/apps/256961600/movie.293x165.jpg?t=1695393579" alt=""  />
        </Stack>
    </Box>
}