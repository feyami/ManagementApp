import { ControlPoint } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab } from "@mui/material";
 
import DataTable from "../../components/dataTable/customer/DataTable";
import FlexBox from "../../components/Box/FlexBox";
import { H5 } from "../../components/Typography";
import useTitle from "../../hooks/useTitle";
import PeopleIcon from "../../assets/icons/PeopleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
 
import { useSelector, useDispatch } from "react-redux";
import {getCustomers,deleteCustomersByIds} from "../../redux/features/customer/customerSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";
 


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
 

const CustomerList = () => {
  // change navbar title
  useTitle("Customer List"); // translate
  const {
    t
  } = useTranslation();
   
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableDataCustomer = useSelector((state) => state.customer.customers);
  useEffect(() => {
    fetchCustomers();
  }, [dispatch]);
 
   
  const fetchCustomers = async () => {
    dispatch(getCustomers());
  };
  const handleDelete = async ids => {
   await dispatch(deleteCustomersByIds(ids)).then(() => {
      fetchCustomers();
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
                <H5>{t("Customers")}</H5>
              </FlexBox>

              

              <Button variant="contained" onClick={() => navigate("/dashboard/customer-add")} startIcon={<ControlPoint sx={{
              color: "text.secondary"
            }} />} sx={{
              fontSize: 12,
              boxShadow: 3
              
            }}>
                {t("Add New Customer")}
              </Button>
            </Wrapper>

            {/* <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)} /> */}

            {
            /*  Data Table */
          }
            <DataTable data={tableDataCustomer} handleDelete={handleDelete} />
          </Grid>
        </Grid>
      </Card>
    </Box>;
};

export default CustomerList;