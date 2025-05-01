import React from "react";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PublicIcon from "@mui/icons-material/Public";
import Carousel from "react-material-ui-carousel";

const carouselItems = [
  {
    title: "Who We Are",
    icon: <PeopleIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />,
    description:
      "We are a small team of developers and finance enthusiasts passionate about empowering individuals to take control of their money using simple tools that work anywhere. Sloth Expenses began as a side project to help friends better manage their monthly spending.",
  },
  {
    title: "Why We Built It",
    icon: (
      <HistoryEduIcon sx={{ fontSize: 40, mr: 2, color: "secondary.main" }} />
    ),
    description:
      "Budgeting apps can often be overwhelming and filled with unnecessary features. We created Sloth Expenses to focus on the essentials — adding, categorizing, and reviewing your expenses quickly and painlessly.",
  },
  {
    title: "Our Vision",
    icon: <PublicIcon sx={{ fontSize: 40, mr: 2, color: "success.main" }} />,
    description:
      "We aim to become the go-to financial tracking tool for anyone seeking clarity and peace of mind when managing their personal finances. Whether on mobile or desktop, Sloth Expenses is built to serve everyone equally.",
  },
];

export default function AboutSlothExpenses() {
  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About Sloth Expenses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sloth Expenses was created with one core mission: to make personal
            finance management simple, accessible, and stress-free for everyone.
            Our platform is built for those who value minimalism and
            effectiveness.
          </Typography>
        </Box>

        <Carousel
          autoPlay={false}
          animation="slide"
          indicatorIconButtonProps={{ style: { padding: "10px" } }}
        >
          {carouselItems.map((item, index) => (
            <Card key={index} sx={{ p: 4, boxShadow: 4, mb: 4 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="medium">
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
