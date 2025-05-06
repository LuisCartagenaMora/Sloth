import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RegisterModal from "../expenses/RegisterModal";
import LoginModal from "../expenses/LoginModal";
import { useNavigate } from "react-router-dom";

export default function SlothHome() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Sloth Expenses
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Sloth Expenses is a simple and intuitive web application built to help
          you keep track of your personal finances. Whether you're a student, a
          working professional, or just someone looking to manage their spending
          better, Sloth Expenses offers a convenient way to stay on top of your
          expenses.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <InfoIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography variant="h5" fontWeight="medium">
                  What is Sloth Expenses?
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Sloth Expenses is designed with simplicity and clarity in mind.
                Users can easily add daily expenses and categorize them (e.g.,
                food, transportation, utilities). The goal is to provide a
                stress-free way to manage spending without complicated setups or
                confusing dashboards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoneyIcon
                  sx={{ fontSize: 40, mr: 2, color: "success.main" }}
                />
                <Typography variant="h5" fontWeight="medium">
                  Track & Organize Spending
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Users can input their expenses in just a few clicks. Each entry
                includes the amount, date, category, and a brief description.
                Over time, Sloth Expenses helps users visualize trends in their
                spending and better understand where their money goes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssessmentIcon
                  sx={{ fontSize: 40, mr: 2, color: "warning.main" }}
                />
                <Typography variant="h5" fontWeight="medium">
                  Analyze Your Finances
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                While Sloth Expenses is intentionally minimal, it provides
                helpful summaries of your total spending and categorizes it for
                clarity. Users can make informed decisions by viewing their
                expenditure patterns, helping them budget and save more
                effectively.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <RegisterModal />
            <LoginModal />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
