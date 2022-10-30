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
 
import { H5 } from "../../components/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
//import useAuth from "hooks/useAuth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { StyledChip, StyledInput } from "../../components/StyledComponent";
import { useSelector, useDispatch } from "react-redux";
import {createContact, updateContact} from "../../redux/features/contact/contactSlice";
import {useLocation, useNavigate} from 'react-router-dom';
 
const AddContact = () => {
  const location = useLocation();
  let data=location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = {
    firstName:data?.firstName || "",
    lastName:data?.lastName || "",
    email:data?.email || "",
    company:data?.company || "",
    phoneNumbers: data?.phoneNumbers || {Work:"",Mobile:"",Home:""},
    address: data?.address || {Work:"",Home:""},
    notes: data?.notes || "",
    socialMedia: data?.socialMedia || {Facebook:"",Twitter:"",Instagram:"",LinkedIn:""},
  };
  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short")
      .required("First Name is Required!"),
    lastName: Yup.string()
      .min(2, "Too Short")
      .required("Last Name is Required!"),
    //email: Yup.string().email().required("Email is Required!"),
    //mobilePhoneNumber: Yup.number().min(8).required("Phone Number is Required!"),
  });
  const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: async (values) =>  {
      if(data){
        await dispatch(updateContact({id:data._id,values})).then(()=>navigate("/dashboard/contact-list"));
        
      }else{
        await dispatch(createContact(values)).then(resetForm);
        
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
      <H5>{data ?t("Edit Contact"):t("Add New Contact")}</H5>
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
            <H5>{t("Personal Info")}</H5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              helperText={touched.firstName && errors.firstName}
              error={Boolean(touched.firstName && errors.firstName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              helperText={touched.lastName && errors.lastName}
              error={Boolean(touched.lastName && errors.lastName)}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <LightTextField
              fullWidth
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="company"
              label="Company"
              value={values.company}
              onChange={handleChange}
              helperText={touched.company && errors.company}
              error={Boolean(touched.company && errors.company)}
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
              helperText={touched.bio && errors.bio}
              error={Boolean(touched.bio && errors.bio)}
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
              name="phoneNumbers.Work"
              label="Work"
              value={values.phoneNumbers.Work}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="phoneNumbers.Mobile"
              label="Mobile"
              value={values.phoneNumbers.Mobile}
              onChange={handleChange}
               
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="phoneNumbers.Home"
              placeholder="Home"
              value={values.phoneNumbers.Home}
              onChange={handleChange}
              />
          </Grid>
          
          <Grid item xs={12}>
            <H5>{t("Addresses")}</H5>
          </Grid>
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="address.Work"
              label="Work"
              value={values.address.Work}
              onChange={handleChange}
              
            />
          </Grid>
           
          <Grid item sm={6} xs={12}>
            <LightTextField
              fullWidth
              name="address.Home"
              placeholder="Home"
              value={values.address.Home}
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
export default AddContact;
