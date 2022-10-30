import {
  Add,
  Clear,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { Autocomplete, Button, Card, Divider, Grid } from "@mui/material";
import FlexBox from "../../components/Box/FlexBox";
import LightTextField from "../../components/textField/LightTextField";
import DarkTextField from "../../components/textField/DarkTextField";
import { H5 } from "../../components/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
//import useAuth from "hooks/useAuth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledChip, StyledInput } from "../../components/StyledComponent";
import { useSelector, useDispatch } from "react-redux";
import {createCustomer, updateCustomer} from "../../redux/features/customer/customerSlice";
import {useLocation, useNavigate} from 'react-router-dom';
 
const AddCustomer = () => {
  const location = useLocation();
  let data=location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = {
    companyName:data?.companyName || "",
    sector:data?.sector || "",
    email:data?.email || "",
    webSite:data?.webSite || "",
    phoneNumbers: data?.phoneNumbers || {Head:"",Branch:"",Fax:""},
    address: data?.address || {Head:"",Branch:""},
    notes: data?.notes || "",
    socialMedia: data?.socialMedia || {Facebook:"",Twitter:"",Instagram:"",LinkedIn:""},
  };
  const fieldValidationSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(3, "Too Short")
      .required("Company Name is Required!"),
    sector: Yup.string()
      .min(2, "Too Short")
      .required("Sector is Required!"),
    //email: Yup.string().email().required("Email is Required!"),
    //mobilePhoneNumber: Yup.number().min(8).required("Phone Number is Required!"),
  });
  const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: async (values) =>  {
      if(data){
        await dispatch(updateCustomer({id:data._id,values})).then(()=>navigate("/dashboard/customer-list"));
        
      }else{
        await dispatch(createCustomer(values)).then(resetForm);
        
      }
      
    },
  });

  
  return (
    
    <Card
      sx={{
        padding: "1.5rem",
        pb: "4rem",
      }}
    >
      <ToastContainer autoClose={2000} />
      <H5>{data ?t("Edit Customer"):t("Add New Customer")}</H5>
      <form onSubmit={handleSubmit}>
        <FlexBox
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FlexBox justifyContent="flex-end" width={270}>
            {!data&&<Button
              variant="contained"
              sx={{
                width: 124,
                color: "text.primary",
                backgroundColor: "secondary.red",
                borderColor: "text.disabled",
                marginRight: "15px",
              }}
              fullWidth
              startIcon={<Clear />}
              onClick={resetForm}
            >
              {t("Clear")}
            </Button>}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                width: 124,
               
              }}
              startIcon={<Add />}
            >
              {data ?t("Update"):t("Save")}
            </Button>
          </FlexBox>
        </FlexBox>
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <H5>{t("General Info")}</H5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="companyName"
              label="Company Name"
              value={values.companyName}
              onChange={handleChange}
              helperText={touched.companyName && errors.companyName}
              error={Boolean(touched.companyName && errors.companyName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="sector"
              label="Sector"
              value={values.sector}
              onChange={handleChange}
              helperText={touched.sector && errors.sector}
              error={Boolean(touched.sector && errors.sector)}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <LightTextField
              fullWidth
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
               
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="webSite"
              label="Web Site"
              value={values.webSite}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12}>
            <LightTextField
              fullWidth
              multiline
              rows={3}
              name="notes"
              value={values.notes}
              onChange={handleChange}
              label="Notes"
               
              sx={{
                "& .MuiOutlinedInput-root textarea": {
                  padding: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{
                width: "100%",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <H5>{t("Phone Numbers")}</H5>
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="phoneNumbers.Head"
              label="Head Office"
              value={values.phoneNumbers.Head}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="phoneNumbers.Branch"
              label="Branch Office"
              value={values.phoneNumbers.Branch}
              onChange={handleChange}
               
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="phoneNumbers.Fax"
              placeholder="Fax"
              value={values.phoneNumbers.Fax}
              onChange={handleChange}
              />
          </Grid>
          
          <Grid item xs={12}>
            <H5>{t("Addresses")}</H5>
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="address.Head"
              label="Head Office"
              value={values.address.Head}
              onChange={handleChange}
              
            />
          </Grid>
           
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="address.Branch"
              placeholder="Branch Office"
              value={values.address.Branch}
              onChange={handleChange}
            />
          </Grid>


          <Grid item xs={12}>
            <Divider
              sx={{
                width: "100%",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <H5>{t("Social Profiles")}</H5>
          </Grid>

          <Grid item xs={12} sm={6}>
            <StyledInput
              fullWidth
              name="socialMedia.facebook"
              onChange={handleChange}
              value={values.socialMedia.facebook}
              placeholder="Facebook URL"
              startAdornment={<Facebook sx={iconStyle} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledInput
              fullWidth
              name="socialMedia.twitter"
              onChange={handleChange}
              value={values.socialMedia.twitter}
              placeholder="Twitter URL"
              startAdornment={<Twitter sx={iconStyle} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledInput
              fullWidth
              name="socialMedia.instagram"
              onChange={handleChange}
              value={values.socialMedia.instagram}
              placeholder="Instagram URL"
              startAdornment={<Instagram sx={iconStyle} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}> 
            <StyledInput
              fullWidth
              name="socialMedia.linkedin"
              onChange={handleChange}
              value={values.socialMedia.linkedin}
              placeholder="LinkedIn URL"
              startAdornment={<LinkedIn sx={iconStyle} />}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}; // common social icons styles

const iconStyle = {
  mr: 1,
  color: "text.disabled",
};
export default AddCustomer;
