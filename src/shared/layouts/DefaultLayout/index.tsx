import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useDrawerContext } from "../../contexts/DrawerContext";

interface IDefaultLayoutProps {
  children: React.ReactNode;
  tituloPagina: string;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
  children,
  tituloPagina,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const {toggleDrawerOpen} = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        height={theme.spacing(12)}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>
              <GiHamburgerMenu />
            </Icon>
          </IconButton>
        )}

        <Typography variant="h4" component="h4">
          {tituloPagina}
        </Typography>
      </Box>
      <Box>Barra de Ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
