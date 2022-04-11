import React from "react";
import { Outlet, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CottageIcon from "@mui/icons-material/Cottage";

import InputFab from "../components/InputFab";

const MainLayout = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)} variant="outlined">
          Menu
        </Button>
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <CreditScoreIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link style={{ display: "block" }} to="/dashboard">
                    生活費
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link style={{ display: "block" }} to="/kotei">
                    固定費
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
        <InputFab />
      </React.Fragment>
      <Outlet />
    </div>
  );
};

export default MainLayout;
