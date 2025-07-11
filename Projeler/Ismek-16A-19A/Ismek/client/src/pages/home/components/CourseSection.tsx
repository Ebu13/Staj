import React from "react";
import { Typography, Card, CardContent, CardHeader, Box } from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/system";

const StyledCourseCard = styled(Card)({
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  background: "#ffffff",
  margin: "0 15px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
  },
});

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

const CourseSection: React.FC<{ title: string; courses: string[] }> = ({ title, courses }) => (
  <Box mb={4}>
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
    </Typography>
    <Slider {...sliderSettings}>
      {courses.map((course) => (
        <StyledCourseCard key={course}>
          <CardHeader
            title={course}
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Bu eğitim hakkında kısa bilgi.
            </Typography>
          </CardContent>
        </StyledCourseCard>
      ))}
    </Slider>
  </Box>
);

export default CourseSection;
