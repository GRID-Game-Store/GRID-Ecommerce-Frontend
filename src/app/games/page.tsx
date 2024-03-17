import {
  Container,
  Typography,
} from '@mui/material';

import {
  RecommendationsModuleForFilterAndSorting,
} from '../components/main/recommendations/recommendationsModule';

export default async function Home() {
    return (
      <main style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"120px", flexDirection:"column"}}>
        <Container sx={{marginTop: "20px", width:"1000px" }}>
        <Typography fontSize={"28px"} fontWeight={"600"}>TOP SELLERS</Typography>
        <Typography fontSize={"20px"} fontWeight={"300"}>All Products</Typography>
        </Container>
        <RecommendationsModuleForFilterAndSorting />
      </main>
    )
  }
  