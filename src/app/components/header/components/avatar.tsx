"use client"
import {
  Box,
  Typography,
} from '@mui/material';

interface IAvatarProps {
  name: string
}
const Avatar: React.FC<IAvatarProps> = ({name}) => {
    return <Box mr={"120px"} mt={"10px"} display={"flex"} justifyContent={"center"} alignItems={"center"}  >
        <Typography height={"max-content"} fontSize={"18px"} fontWeight={"700"}>{name}</Typography>
    </Box>
    
}

export default Avatar