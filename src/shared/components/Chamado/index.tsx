import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { FaPaperclip } from "react-icons/fa";

const Chamado: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "95%",
        height: "max-content",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h5" sx={{ fontSize: 14, padding: "10px" }}>
          Problema com Protheus
        </Typography>
        <Chip
          label="Protheus"
          variant="filled"
          color="primary"
          size="small"
          sx={{ marginLeft: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: 12, padding: "10px" }}
        >
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repudiandae explicabo sit quibusdam cupiditate ea amet, est debitis
          quae quo id laborum, recusandae placeat. Eligendi ut aliquam quasi!
          Unde, consequatur.
        </Typography>
        <Badge badgeContent={2} color="primary">
          {" "}
          <Icon sx={{ marginLeft: 1 }}>
            <FaPaperclip size={20} color="#4D84E3" />
          </Icon>
        </Badge>
      </CardContent>
      <CardActions
        sx={{ display: "flex", float: "left", width: "100%", marginLeft: 6 }}
      >
        <Button size="small" variant="outlined">
          Visualizar
        </Button>
      </CardActions>
    </Card>
  );
};

export default Chamado;
