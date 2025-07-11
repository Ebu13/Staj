import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';

const News: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Güncel Haberler
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/news1.jpg"
                alt="Haber 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Haber 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Burası bir haber açıklaması.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/news2.jpg"
                alt="Haber 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Haber 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Burası bir haber açıklaması.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default News;
