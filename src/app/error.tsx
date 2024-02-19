"use client";

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

export const ErrorUILayer = ({
  message,
  buttonTitle,
  buttonCallback,
}: {
  message: string;
  buttonTitle: string;
  buttonCallback?: () => void;
}) => {
  return (
    <>
      <Typography fontWeight={"600"} mb={"30px"} variant="h4">
        {message}
      </Typography>
      <Button onClick={buttonCallback} sx={{ width: "200px" }}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      height={"100vh"}
      flexDirection={"column"}
    >
      <ErrorUILayer
        message={error.message}
        buttonTitle={"Refresh"}
        buttonCallback={() => reset()}
      />
    </Box>
  );
}
