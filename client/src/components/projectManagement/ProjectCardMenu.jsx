import { Menu, MenuItem } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import React from "react";
import { Small } from "../Typography";
import { useNavigate } from "react-router-dom";
const MoreOptions = ({
  anchorElement,
  handleProjectCardMenuClose,
  project,
}) => {
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorElement}
      open={Boolean(anchorElement)}
      onClose={handleProjectCardMenuClose}
    >
      <MenuItem
        onClick={handleProjectCardMenuClose}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <InfoRoundedIcon
          sx={{
            fontSize: 14,
            marginRight: 1,
          }}
        />
        <Small fontWeight={500}>Detail</Small>
      </MenuItem>

      <MenuItem
        onClick={()=>navigate("/dashboard/project-add",{state:project})}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <EditOutlinedIcon
          sx={{
            fontSize: 14,
            marginRight: 1,
          }}
        />
        <Small fontWeight={500}>Edit</Small>
      </MenuItem>
      <MenuItem
        onClick={handleProjectCardMenuClose}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <DeleteOutlinedIcon
          sx={{
            fontSize: 14,
            marginRight: 1,
          }}
        />
        <Small fontWeight={500}>Remove</Small>
      </MenuItem>
    </Menu>
  );
};

export default MoreOptions;
