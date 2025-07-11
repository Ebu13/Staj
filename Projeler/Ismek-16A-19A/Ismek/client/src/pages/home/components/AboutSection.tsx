import React from "react";
import { Typography, Box } from "@mui/material";

const AboutSection: React.FC = () => (
  <Box mb={4}>
    <Typography variant="h5" component="h2" gutterBottom>
      Hakkımızda
    </Typography>
    <Typography variant="body1" component="p">
      Enstitü İstanbul İSMEK, mesleki ve teknik eğitimlerden sanat eğitimlerine kadar geniş bir yelpazede eğitimler sunmaktadır.
    </Typography>
  </Box>
);

export default AboutSection;
