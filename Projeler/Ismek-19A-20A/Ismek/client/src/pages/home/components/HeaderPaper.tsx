import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledHeaderPaper = styled(Paper)({
  padding: "40px",
  textAlign: "center",
  background: "linear-gradient(to right, #00bcd4, #00796b)",
  color: "#ffffff",
  marginBottom: "40px",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
});

const HeaderOverlay = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.4)",
  zIndex: 1,
});

const HeaderTextContainer = styled(Box)({
  position: "relative",
  zIndex: 2,
  color: "#ffffff",
});

const LearnMoreButton = styled(Button)({
  marginTop: "16px",
  backgroundColor: "#ffffff",
  color: "#00bcd4",
  borderRadius: "20px",
  padding: "12px 24px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const Badge = styled(Box)({
  display: "inline-block",
  backgroundColor: "#e91e63",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "20px",
  fontWeight: "bold",
  textTransform: "uppercase",
  margin: "8px",
});

const HeaderPaper: React.FC = () => (
  <StyledHeaderPaper>
    <HeaderOverlay />
    <HeaderTextContainer>
      <Typography variant="h4" component="p" gutterBottom>
        Yaşam Boyu Eğitimde İstanbullunun İlk Tercihi
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap="16px" marginTop="16px">
        <Badge>
          Yüz Yüze Eğitim Başvuruları 2 Eylül’de
        </Badge>
        <Badge sx={{ backgroundColor: "#f57c00" }}>
          Uzaktan Eğitim Başvuruları Devam Ediyor
        </Badge>
      </Box>
      <LearnMoreButton variant="contained">Daha Fazla Bilgi</LearnMoreButton>
    </HeaderTextContainer>
  </StyledHeaderPaper>
);

export default HeaderPaper;
