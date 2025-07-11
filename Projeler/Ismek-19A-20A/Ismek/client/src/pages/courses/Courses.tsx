import React from 'react';
import { Container, Typography, Box, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material';

const Courses: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Sol Taraftaki Filtreler */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Filtreler
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Tipi</InputLabel>
              <Select defaultValue="">
                <MenuItem value="uzaktan">Uzaktan</MenuItem>
                <MenuItem value="yuz-yuze">Yüz Yüze</MenuItem>
                <MenuItem value="harmanlanmis">Harmanlanmış</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Dili</InputLabel>
              <Select defaultValue="">
                <MenuItem value="ingilizce">İngilizce</MenuItem>
                <MenuItem value="turkce">Türkçe</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Dalı</InputLabel>
              <Select defaultValue="">
                <MenuItem value="mesleki-teknik">Mesleki ve Teknik</MenuItem>
                <MenuItem value="kisisel-gelisim">Kişisel Gelişim</MenuItem>
                <MenuItem value="guzel-sanatlar">Güzel Sanatlar</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Alanı</InputLabel>
              <Select defaultValue="">
                <MenuItem value="egitim-alani-1">Eğitim Alanı 1</MenuItem>
                <MenuItem value="egitim-alani-2">Eğitim Alanı 2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Programları</InputLabel>
              <Select defaultValue="">
                <MenuItem value="program-1">Program 1</MenuItem>
                <MenuItem value="program-2">Program 2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>İlçe</InputLabel>
              <Select defaultValue="">
                <MenuItem value="ilce-1">İlçe 1</MenuItem>
                <MenuItem value="ilce-2">İlçe 2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Eğitim Merkezleri</InputLabel>
              <Select defaultValue="">
                <MenuItem value="merkez-1">Merkez 1</MenuItem>
                <MenuItem value="merkez-2">Merkez 2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Kayıt Durumu</InputLabel>
              <Select defaultValue="">
                <MenuItem value="devre-disi">Devre Dışı</MenuItem>
                <MenuItem value="kayda-acilacak">Kayda Açılacak</MenuItem>
                <MenuItem value="kayda-acik">Kayda Açık</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Sağ Taraftaki Eğitimler */}
        <Grid item xs={12} md={8}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Etkinlik Takvimi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Etkinlik 1</Typography>
                    <Typography color="textSecondary">01 Ocak 2024</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Etkinlik 2</Typography>
                    <Typography color="textSecondary">15 Ocak 2024</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Etkinlik 3</Typography>
                    <Typography color="textSecondary">01 Şubat 2024</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Courses;
