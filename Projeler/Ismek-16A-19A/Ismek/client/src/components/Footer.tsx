import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'background.paper', padding: '2rem 0', borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Enstitü İstanbul İSMEK
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Yaşam Boyu Eğitimde İstanbullunun İlk Tercihi
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Bağlantılar
            </Typography>
            <Link href="/" color="textPrimary" underline="hover">
              Ana Sayfa
            </Link>
            <br />
            <Link href="/courses" color="textPrimary" underline="hover">
              Eğitimler
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Adres: İstanbul, Türkiye
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Telefon: +90 212 123 45 67
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Enstitü İstanbul İSMEK
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
