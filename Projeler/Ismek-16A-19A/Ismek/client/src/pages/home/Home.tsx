import React from "react";
import HeaderPaper from "./components/HeaderPaper";
import CourseSection from "./components/CourseSection";
import AboutSection from "./components/AboutSection";
import SearchSectionComponent from "./components/SearchSectionComponent";
import InfoSectionComponent from "./components/InfoSectionComponent";

const Home: React.FC = () => {
  const courses = ["Kurs 1", "Kurs 2", "Kurs 3", "Kurs 4"];

  return (
    <div>
      <HeaderPaper />
      <SearchSectionComponent />
      <CourseSection title="Popüler Kurslar" courses={courses} />
      <InfoSectionComponent />
      <AboutSection />
    </div>
  );
};

export default Home;
