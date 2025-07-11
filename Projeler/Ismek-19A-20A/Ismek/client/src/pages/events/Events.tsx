import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Events: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Etkinlik Takvimi
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Etkinlik 1" secondary="01 Ocak 2024" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Etkinlik 2" secondary="15 Ocak 2024" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Etkinlik 3" secondary="01 Şubat 2024" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Events;
