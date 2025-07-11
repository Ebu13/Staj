import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Corporate from './pages/corporate/Corporate';
import Events from './pages/events/Events';
import Centers from './pages/centers/Centers';
import News from './pages/news/News';
import Courses from './pages/courses/Courses';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/centers" element={<Centers />} />
        <Route path="/news" element={<News />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
