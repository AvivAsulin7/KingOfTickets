import { useState } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";

export default function CountTickets({ removeFormFields, addFormFields }) {
  const [count, setCount] = useState(1);

  const addToForm = () => {
    addFormFields();
    setCount(count + 1);
  };

  const removeForm = () => {
    setCount(Math.max(count - 1, 1));
    removeFormFields();
  };

  return (
    <Box
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          marginBottom: 2,
        },
        "& .MuiBadge-root": {
          marginRight: 4,
        },
      }}
    >
      <div>
        <ButtonGroup>
          <Badge color="secondary" badgeContent={count}>
            <StyleOutlinedIcon fontSize="large" />
          </Badge>
          <Button
            aria-label="reduce"
            onClick={() => {
              removeForm();
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              addToForm();
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}
