import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled(Box)({
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
});

const AboutItem = styled(Paper)({
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
});

const AboutSection: React.FC = () => (
  <AboutContainer>
    <Typography variant="h4" component="h2" gutterBottom>
      Biz Kimiz?
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AboutItem>
          <Typography variant="h6" component="h3" gutterBottom>
            Eğitim Misyonumuz
          </Typography>
          <Typography variant="body1">
            Amacımız, kaliteli eğitim hizmetleri sunarak bireylerin kişisel ve profesyonel gelişimlerini desteklemektir.
          </Typography>
        </AboutItem>
      </Grid>
      <Grid item xs={12} md={6}>
        <AboutItem>
          <Typography variant="h6" component="h3" gutterBottom>
            Vizyonumuz
          </Typography>
          <Typography variant="body1">
            Eğitimde liderliği hedefleyen ve sürekli gelişen bir eğitim merkezi olarak, ulusal ve uluslararası alanda tanınmak.
          </Typography>
        </AboutItem>
      </Grid>
    </Grid>
  </AboutContainer>
);

export default AboutSection;
