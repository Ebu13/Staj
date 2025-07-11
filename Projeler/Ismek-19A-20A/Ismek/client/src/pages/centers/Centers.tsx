import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const Centers: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Eğitim Merkezleri
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">Merkez 1</Typography>
              <Typography variant="body1">Adres: ...</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">Merkez 2</Typography>
              <Typography variant="body1">Adres: ...</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Centers;
