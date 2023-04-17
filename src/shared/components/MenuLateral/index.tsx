/* eslint-disable import/no-duplicates */
import React from "react";

import {
  Box,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";

import { FaHome } from "react-icons/fa";
import Chamado from "../Chamado";
// import { useAppThemeContext } from "../../contexts/ThemeContext";

// import logo from "../../../media/images/logo.png";
// import logo2 from "../../../media/images/logo2.png";
interface IMenuLateralChildrenConfig {
  children: React.ReactNode;
}

// const { themeName } = useAppThemeContext();

export const MenuLateral: React.FC<IMenuLateralChildrenConfig> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(45)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            margin={3}
            padding={2}
            height={theme.spacing(20)}
            display={"flex"}
            alignItems={"start"}
            justifyContent={"top"}
          >
            <img
              // src={themeName === "light" ? logo : logo2}
              alt="Cinbal Help Desk Logo"
              height={60}
              width={130}
            />
          </Box>

          <Box flex={1}>
            <List component="nav">
              <Chamado />
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(46)}>
        {children}
      </Box>
    </>
  );
};
