"use client"

import { Box, Button, Container, Typography } from "@mui/material"

export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} height={"30vh"} flexDirection={"column"} >
        <Typography fontWeight={"600"} variant="h4">Oops! Our Website is Doing a Digital Tango – 500 Error Edition</Typography>
        <Button onClick={() => reset()} sx={{width:"200px"}}>Refresh</Button> 
      </Box>
    )
  }