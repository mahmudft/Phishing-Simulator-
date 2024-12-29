import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { Client } from "../ApiClient/client";
import { AttemptInterface, FormData } from "../interfaces/attempt.interfaces";
import { useNavigate } from "react-router-dom";

const PhishingForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    recipient: "",
    body: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Client.post<AttemptInterface>("/attempts", formData);
      navigate("/list");
    } catch (error) {
      console.log((error as Error).message);
    }
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container
      sx={{
        width: "100%",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Phishing Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />

          <TextField
            fullWidth
            label="Body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PhishingForm;
