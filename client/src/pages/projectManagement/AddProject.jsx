import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Grid,
  Modal,
  Stack,
  useTheme,
  MenuItem,
  Select,
  styled,
  InputBase,
} from "@mui/material";
import AddIconButton from "../../components/Button/AddIconButton";
import DarkTextField from "../../components/textField/DarkTextField";
import FlexBox from "../../components/Box/FlexBox";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { H6, Small, H3 } from "../../components/Typography";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {getCustomersCompanyNames} from "../../redux/features/customer/customerSlice";
import {createProject, updateProject} from "../../redux/features/project/projectSlice";
import dayjs from 'dayjs'; 
import {useLocation, useNavigate} from 'react-router-dom';

const StyledModalCard = styled(Card)(({ theme }) => ({
  top: "50%",
  left: "50%",
  maxWidth: 700,
  minWidth: 300,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  transform: "translate(-50%, -50%)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    "& .main-form": {
      height: 200,
      overflow: "auto",
    },
  },
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.disabled,
}));
const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: 14,
    minHeight: 35,
    fontWeight: 500,
    borderRadius: "8px",
    padding: "0px 1rem",
  color: theme.palette.text.primary,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.divider,
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
}));

const CreateProject = ({ open, onClose, setOpenModal, data, edit }) => {
  
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  let initialValues = {
    title: data?.title || "",
    description: data?.description || "",
    startDate: data?.startDate || dayjs(Date.now()),
    endDate: data?.endDate || dayjs(Date.now()),
     
     
    customer: data?.customer || [],
    file: data?.file || [],
    note: data?.notes || "",
  };
useEffect(() => {
    dispatch(getCustomersCompanyNames());
  }, [dispatch]);
  const customers=useSelector(state=>state.customer.customers);

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs(Date.now()));
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs(Date.now()));
  const [selectedFile, setSelectedFile] = useState(null);

 
  const fieldValidationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too Short").required("Title is Required!"),
    description: Yup.string()
      .min(5, "Too Short")
      .required("Description is Required!"),
      
  });
  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      validationSchema: fieldValidationSchema,
      onSubmit: async (values) => {
        if (edit) {
          await dispatch(updateProject(values));
        } else {
          dispatch(createProject(values));
        }
        closeModel();
      }
    });
    const closeModel = () => {
      setOpenModal(false);
      resetForm();
    };
    const handleChangeStartDate = (newValue) => {
      setSelectedStartDate(dayjs(newValue));
      values.startDate = dayjs(newValue);
    };
    const handleChangeEndDate = (newValue) => {
      setSelectedEndDate(dayjs(newValue));
      values.endDate = dayjs(newValue);
    };
    function handleChangeFile(event) {
      setSelectedFile(event.target.files[0])
      values.file = event.target.files[0]
    }
  return (
    <Modal open={open} onClose={() => setOpenModal(false)}>
      <StyledModalCard>
        
        <H3>{edit ? "Edit Product" : "Add New Customer"}</H3>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="main-form">
            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Project Name</H6>
              <DarkTextField
                name="title"
                onChange={handleChange}
                value={values.title}
                error={Boolean(errors.title && touched.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Customer</H6>
              <StyledSelect
                fullWidth
                name="customer"
                value={customers._id}
                onChange={handleChange}
                error={Boolean(errors.customer && touched.customer)}
                helperText={touched.customer && errors.customer}
                input={<InputBase placeholder="customer" />}
                IconComponent={() => <KeyboardArrowDown fontSize="small" />}
              >
                {customers && (customers).map((item) => (
                  <StyledMenuItem key={item._id} value={item._id}>
                    {item.companyName}
                  </StyledMenuItem>
                ))}
                 
              </StyledSelect>
            </Grid>
            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Start Date</H6>
              <DesktopDatePicker
          name="startDate"
          value={selectedStartDate}
          onChange={handleChangeStartDate}
          renderInput={(params) => <DarkTextField {...params} />}
        />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>End Date</H6>
              <DesktopDatePicker
          name="endDate"
          value={selectedEndDate}
          onChange={handleChangeEndDate}
          renderInput={(params) => <DarkTextField {...params} />}
        />
            </Grid>
            
               <Grid item xs={12}>
          <Box mb={2}>
          <H6 mb={1}>Add File</H6>

          <label htmlFor="file">
           
            <input name="file" onChange={handleChangeFile}  id="file" type="file" style={{
            display: "none"
          }} />
            <IconButton component="span" disableRipple sx={{
            padding: 0,
            display: "block"
          }}>
              <Box sx={{
              backgroundColor: theme.palette.mode === "light" ? "secondary.300" : "divider",
              minHeight: 40,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                <DriveFolderUploadOutlinedIcon sx={{
                fontSize: 18,
                color: "text.disabled",
                marginRight: 0.5
              }} />
                <Small color="text.disabled">Choose a file</Small>
              </Box>
            </IconButton>
          </label>
        </Box>
        </Grid> 
            <Grid item xs={12}>
            <H6 mb={1}>Description</H6>
            <DarkTextField
              fullWidth
              multiline
              rows={2}
              name="description"
              value={values.description}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root textarea": {
                  padding: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <H6 mb={1}>Notes</H6>
            <DarkTextField
              fullWidth
              multiline
              rows={1}
              name="note"
              value={values.note}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root textarea": {
                  padding: 0,
                },
              }}
            />
          </Grid>
        
          </Grid>

          <FlexBox justifyContent="flex-end" marginTop={2}>
           
            <Button
              fullWidth
              variant="outlined"
              onClick={closeModel}
              sx={{
                width: 124,
                fontSize: 12,
                marginRight: 2,
                color: "text.disabled",
                borderColor: "text.disabled",
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                width: 124,
                fontSize: 12,
              }}
            >
              Save
            </Button>
           
          </FlexBox>
        </form>

        <Box my={1}>
          <Small>Team Leaders</Small>
          <Stack direction="row" spacing={1} mt={1}>
            <AddIconButton />
            <Avatar alt="Feyami" src="" />
            <Avatar alt="Hasan" src="" />
            
          </Stack>
        </Box>
      </StyledModalCard>
    </Modal>
  );
};

export default CreateProject;
