import React from "react";
import { Typography, Card, CardContent, CardHeader, Box } from "@mui/material";
import { styled } from "@mui/system";

const CourseContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  gap: "20px",
  padding: "20px",
  scrollSnapType: "x mandatory",
});

const CourseCard = styled(Card)({
  minWidth: "250px",
  flex: "0 0 auto",
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const CourseSection: React.FC<{ title: string; courses: string[] }> = ({ title, courses }) => (
  <Box>
    <Typography variant="h4" component="h2" gutterBottom>
      {title}
    </Typography>
    <CourseContainer>
      {courses.map((course, index) => (
        <CourseCard key={index}>
          <CardHeader
            title={course}
            titleTypographyProps={{ variant: "h6" }}
            sx={{ backgroundColor: "#00bcd4", color: "#ffffff" }}
          />
          <CardContent>
            <Typography variant="body2">
              Kısa açıklama buraya gelecek.
            </Typography>
          </CardContent>
        </CourseCard>
      ))}
    </CourseContainer>
  </Box>
);

export default CourseSection;
