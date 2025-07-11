import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, CircularProgress, Alert, Pagination } from '@mui/material';
import axios from 'axios';

// Haber türü
interface Haber {
  haberId: number;
  baslik: string;
  icerik: string;
  tarih: string;
  fotografDosyaYolu: string;
}

const News: React.FC = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 9; // Her sayfada gösterilecek haber sayısı

  useEffect(() => {
    // API'den veri çekme
    axios.get('https://localhost:7288/api/Haberler')
      .then(response => {
        setHaberler(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Haberler alınırken bir hata oluştu:', error);
        setError('Haberler alınırken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Sayfalanmış haberler
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHaberler = haberler.slice(startIndex, endIndex);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Güncel Haberler
        </Typography>
        <Grid container spacing={3}>
          {currentHaberler.map(haber => (
            <Grid item xs={12} sm={6} md={4} key={haber.haberId}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={haber.fotografDosyaYolu} // Dinamik olarak veriyi göster
                  alt={haber.baslik}
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                    {haber.baslik}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {new Date(haber.tarih).toLocaleDateString()} {/* Tarihi formatlama */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {haber.icerik.length > 100 ? `${haber.icerik.substring(0, 100)}...` : haber.icerik} {/* İçeriği kısalt */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default News;
