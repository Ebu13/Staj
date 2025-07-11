import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Paper } from '@mui/material';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://localhost:7297/api/Orders');
        const fetchedOrders = response.data.$values;
        setOrders(fetchedOrders); // Siparişleri state'e ata
      } catch (err) {
        setError(err); // Hata durumunda state'e ata
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    fetchOrders();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7297/api/User/${userId}`);
      return response.data; // Kullanıcı bilgilerini döndür
    } catch (err) {
      console.error("Kullanıcı bilgileri alınamadı:", err);
      return null; // Hata durumunda null döndür
    }
  };

  const fetchMenuDetails = async (menuId) => {
    try {
      const response = await axios.get(`https://localhost:7297/api/Menu/${menuId}`);
      return response.data; // Menü bilgilerini döndür
    } catch (err) {
      console.error("Menü bilgileri alınamadı:", err);
      return null; // Hata durumunda null döndür
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Siparişler
      </Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <List>
          {orders.map(order => (
            <OrderItem key={order.orderId} order={order} fetchUserDetails={fetchUserDetails} fetchMenuDetails={fetchMenuDetails} />
          ))}
        </List>
      </Paper>
    </Container>
  );
};

const OrderItem = ({ order, fetchUserDetails, fetchMenuDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [menuDetails, setMenuDetails] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await fetchUserDetails(order.userId);
      setUserDetails(user);
      setLoadingUser(false);
    };

    const getMenuDetails = async () => {
      const menu = await fetchMenuDetails(order.menuId);
      setMenuDetails(menu);
      setLoadingMenu(false);
    };

    getUserDetails();
    getMenuDetails();
  }, [order.userId, order.menuId, fetchUserDetails, fetchMenuDetails]);

  if (loadingUser || loadingMenu) return <ListItem><CircularProgress size={24} /></ListItem>;
  if (!userDetails) return <ListItem><Typography color="error">Kullanıcı bulunamadı.</Typography></ListItem>;
  if (!menuDetails) return <ListItem><Typography color="error">Menü bulunamadı.</Typography></ListItem>;

  return (
    <ListItem>
      <ListItemText
        primary={`Kullanıcı: ${userDetails.username}, Email: ${userDetails.email}`}
        secondary={`Ürün Türü: ${order.productType}, Menü: ${menuDetails.name}`}
      />
    </ListItem>
  );
};

export default OrderPage;
