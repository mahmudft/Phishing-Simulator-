import { FormEvent, useState } from "react";
import { Client } from "../ApiClient/client";
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { AuthFormProps, AuthPageProps } from "@/interfaces/auth.interfaces";


const Signup: React.FC<AuthPageProps> = ({ authChecker }: AuthPageProps) => {
  const [formData, setFormData] = useState<AuthFormProps>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let response = await Client.post("/auth/signup", formData);
      localStorage.setItem("token", response?.data?.token);
      authChecker();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // disabled={loading}
            >
              {/* {loading ? <CircularProgress size={24} /> : 'Sign In'} */}
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link href="/login" variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
