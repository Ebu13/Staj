import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img 
          src="/logo-color.svg" 
          alt="İSMEK Logo" 
          style={{ height: '40px' }} 
        />
        <div>
          <Button color="inherit" component={Link} to="/">Ana Sayfa</Button>
          <Button color="inherit" component={Link} to="/corporate">Kurumsal</Button>
          <Button color="inherit" component={Link} to="/events">Etkinlik Takvimi</Button>
          <Button color="inherit" component={Link} to="/centers">Eğitim Merkezleri</Button>
          <Button color="inherit" component={Link} to="/news">Güncel Haberler</Button>
          <Button color="inherit" component={Link} to="/courses">Eğitimler</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
