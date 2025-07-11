import React from "react";
import { Box, Typography } from "@mui/material";
import { School, LibraryBooks, LocationCity, PeopleAlt } from "@mui/icons-material";
import { styled } from "@mui/system";

const InfoSection = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap",
});

const InfoItem = styled(Box)({
  textAlign: "center",
  flex: "1 1 20%",
  minWidth: "200px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const InfoSectionComponent: React.FC = () => (
  <InfoSection>
    <InfoItem>
      <School fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        1000+ Yüz Yüze ve Uzaktan Eğitim Programı
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Çeşitli alanlarda geniş bir eğitim programı seçeneği.
      </Typography>
    </InfoItem>
    <InfoItem>
      <LibraryBooks fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        18 Uzmanlık Okulu
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Farklı uzmanlık alanlarında eğitim sunan okullar.
      </Typography>
    </InfoItem>
    <InfoItem>
      <LocationCity fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        132 Eğitim Merkezi
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Geniş bir eğitim merkezi ağıyla hizmet veriyoruz.
      </Typography>
    </InfoItem>
    <InfoItem>
      <LibraryBooks fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        2 Kütüphane Atölyesi
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Eğitim materyalleri ve kaynaklar için kütüphane atölyeleri.
      </Typography>
    </InfoItem>
    <InfoItem>
      <PeopleAlt fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        3.005.750 Mezun (2005 Sonrası)
      </Typography>
      <Typography variant="body2" color="textSecondary">
        2005 sonrası mezun olan geniş bir öğrenci kitlesi.
      </Typography>
    </InfoItem>
  </InfoSection>
);

export default InfoSectionComponent;
