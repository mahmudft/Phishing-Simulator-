import React, { useContext, ReactNode } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BallotIcon from "@mui/icons-material/Ballot";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContextProps } from "@/interfaces/context.interfaces";
import { AuthContext } from "../AuthContext.tsx";

const DRAWER_WIDTH = 240;

const PrivateLayout: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { checkStatus } = useContext<AuthContextProps>(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    checkStatus();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Phishing Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/list")}>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Phishing List" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/form")}>
                <ListItemIcon>
                  <DynamicFormIcon />
                </ListItemIcon>
                <ListItemText primary="Phishing Form" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        sx={{
          marginTop: "70px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
