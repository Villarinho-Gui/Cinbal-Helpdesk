import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { FaPaperclip } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IChamadoProps {
  category: string;
  title: string;
  description: string;
  onCLick?: () => void | undefined;
  to: string;
}

const Chamado: React.FC<IChamadoProps> = ({
  category,
  description,
  title,
  onCLick,
  to,
}) => {
  const navigate = useNavigate();

  const triggerNavigate = () => {
    navigate(to);
    onCLick?.();
  };

  return (
    <CardActionArea onClick={triggerNavigate}>
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
            {title}
          </Typography>
          <Chip
            label={category}
            variant="filled"
            color="primary"
            size="small"
            sx={{ marginLeft: 1 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: 12,
              padding: "10px",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {description}
          </Typography>
          <Badge badgeContent={2} color="primary">
            {" "}
            <Icon sx={{ marginLeft: 1 }}>
              <FaPaperclip size={20} color="#4D84E3" />
            </Icon>
          </Badge>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default Chamado;
