import React from "react";
import HeaderPaper from "./components/HeaderPaper";
import CourseSection from "./components/CourseSection";
import AboutSection from "./components/AboutSection";
import SearchSectionComponent from "./components/SearchSectionComponent";
import InfoSectionComponent from "./components/InfoSectionComponent";
import { Container, Box } from "@mui/material";

const Home: React.FC = () => {
  const courses = ["Kurs 1", "Kurs 2", "Kurs 3", "Kurs 4"];

  return (
    <Container>
      <HeaderPaper />
      <Box mt={4}>
        <SearchSectionComponent />
      </Box>
      <Box my={4}>
        <CourseSection title="Popüler Kurslar" courses={courses} />
      </Box>
      <Box my={4}>
        <InfoSectionComponent />
      </Box>
      <Box my={4}>
        <AboutSection />
      </Box>
    </Container>
  );
};

export default Home;
