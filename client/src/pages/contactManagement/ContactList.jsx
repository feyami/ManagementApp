import { ControlPoint } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab } from "@mui/material";
import AddContact from "./AddContact";
import DataTable from "../../components/dataTable/contact/DataTable";
import FlexBox from "../../components/Box/FlexBox";
import { H5 } from "../../components/Typography";
import useTitle from "../../hooks/useTitle";
import PeopleIcon from "../../assets/icons/PeopleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../utils/axios"; // styled components
import { useSelector, useDispatch } from "react-redux";
import {getContacts,deleteContactsByIds} from "../../redux/features/contact/contactSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "0 1.5rem",
  paddingTop: "1rem"
}));
const IconWrapper = styled(Box)(({
  theme
}) => ({
  backgroundColor: theme.palette.primary.light,
  width: 40,
  height: 40,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "0.5rem"
}));
 

const ContactList = () => {
  // change navbar title
  useTitle("Contact List"); // translate
  const {
    t
  } = useTranslation();
   
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state) => state.contact.contacts);
  useEffect(() => {
    fetchContacts();
  }, [dispatch]);
 
   
  const fetchContacts = async () => {
    dispatch(getContacts());
  };
  const handleDelete = async ids => {
   await dispatch(deleteContactsByIds(ids)).then(() => {
      fetchContacts();
    });
  };

    
  return <Box pt={2} pb={4}>
    <ToastContainer autoClose={2000} />
      <Card sx={{
      boxShadow: 4
    }}>
        <Grid container>
          <Grid item xs={12}>
            <Wrapper>
              <FlexBox alignItems="center">
                <IconWrapper>
                  <PeopleIcon sx={{
                  color: "primary.main"
                }} />
                </IconWrapper>
                <H5>{t("Contacts")}</H5>
              </FlexBox>

              

              <Button variant="contained" onClick={() => navigate("/dashboard/contact-add")} startIcon={<ControlPoint sx={{
              color: "text.secondary"
            }} />} sx={{
              fontSize: 12,
              boxShadow: 3
              
            }}>
                {t("Add New Contact")}
              </Button>
            </Wrapper>

            {/* <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)} /> */}

            {
            /*  Data Table */
          }
            <DataTable data={tableData} handleDelete={handleDelete} />
          </Grid>
        </Grid>
      </Card>
    </Box>;
};

export default ContactList;