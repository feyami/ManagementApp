import { Menu, MenuItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React from "react";
import { Small } from "../Typography"; 

const MoreOptions = ({
  anchorEl,
  handleMoreClose,
  project,
  setIsModalOpen,
  setEditProject
}) => {

  const handleEdit = () => {
    setEditProject(project);
    setIsModalOpen(true);
    handleMoreClose();
  };

  return <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMoreClose}>
      <MenuItem onClick={handleEdit} sx={{
      "&:hover": {
        color: "primary.main"
      }
    }}>
        <EditOutlinedIcon sx={{
        fontSize: 14,
        marginRight: 1
      }} />
        <Small fontWeight={500}>Edit</Small>
      </MenuItem>
      <MenuItem onClick={handleMoreClose} sx={{
      "&:hover": {
        color: "primary.main"
      }
    }}>
        <DeleteOutlinedIcon sx={{
        fontSize: 14,
        marginRight: 1
      }} />
        <Small fontWeight={500}>Remove</Small>
      </MenuItem>
    </Menu>
};

export default MoreOptions;