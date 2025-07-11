import React from "react";
import { Box, Typography } from "@mui/material";
import { School, LibraryBooks, LocationCity, PeopleAlt } from "@mui/icons-material";
import { styled } from "@mui/system";

const InfoSection = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "20px",
  marginBottom: "40px",
});

const InfoItem = styled(Box)({
  textAlign: "center",
  width: "20%",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
});

const InfoSectionComponent: React.FC = () => (
  <InfoSection>
    <InfoItem>
      <School fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        100+ Kurs
      </Typography>
      <Typography variant="body2" component="p">
        Uzman eğitmenler tarafından verilen geniş kurs yelpazesi.
      </Typography>
    </InfoItem>
    <InfoItem>
      <LibraryBooks fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        5000+ Kitap
      </Typography>
      <Typography variant="body2" component="p">
        Geniş bir kaynak kütüphanesi ve eğitim materyalleri.
      </Typography>
    </InfoItem>
    <InfoItem>
      <LocationCity fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        10+ Şube
      </Typography>
      <Typography variant="body2" component="p">
        İstanbul genelinde çeşitli lokasyonlarda şubeler.
      </Typography>
    </InfoItem>
    <InfoItem>
      <PeopleAlt fontSize="large" color="primary" />
      <Typography variant="h6" component="p" marginTop="10px">
        20000+ Öğrenci
      </Typography>
      <Typography variant="body2" component="p">
        Eğitimlerimizden yararlanan binlerce öğrenci.
      </Typography>
    </InfoItem>
  </InfoSection>
);

export default InfoSectionComponent;
