import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const SearchContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginTop: "16px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
});

const SearchSection = styled(Box)({
  display: "flex",
  gap: "16px",
  flex: 1,
});

const SearchSectionComponent: React.FC = () => (
  <SearchContainer>
    <SearchSection>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="location-label">Lokasyon</InputLabel>
        <Select
          labelId="location-label"
          label="Lokasyon"
          defaultValue=""
        >
          <MenuItem value="atasehir">Ataşehir</MenuItem>
          <MenuItem value="kadikoy">Kadıköy</MenuItem>
          <MenuItem value="umraniye">Ümraniye</MenuItem>
        </Select>
      </FormControl>
    </SearchSection>
    <SearchSection>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="education-type-label">Eğitim Türü</InputLabel>
        <Select
          labelId="education-type-label"
          label="Eğitim Türü"
          defaultValue=""
        >
          <MenuItem value="yuz-yuze">Yüz Yüze</MenuItem>
          <MenuItem value="uzaktan">Uzaktan</MenuItem>
        </Select>
      </FormControl>
    </SearchSection>
    <SearchSection>
      <TextField
        variant="outlined"
        fullWidth
        label="Anahtar Kelime"
        placeholder="Eğitim adı, konu vb."
      />
    </SearchSection>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ borderRadius: "20px", padding: "12px" }}
    >
      Ara
    </Button>
  </SearchContainer>
);

export default SearchSectionComponent;
