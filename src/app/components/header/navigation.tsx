import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { NAVIGATION_POINT, SPACING } from "../../constants/header";

const Navigation : React.FC = () => {
  const navigationPoints = NAVIGATION_POINT.map((point, i) => {
    return (
      <Typography key={i} sx={fontSize}>
        {point}
      </Typography>
    );
  });
  
  return (
    <Stack direction="row" spacing={SPACING} pl={"60px"} >
      {navigationPoints}
    </Stack>
  );
};
export default Navigation;

const fontSize = { fontSize: "30px" };
