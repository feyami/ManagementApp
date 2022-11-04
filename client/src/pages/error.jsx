import { Box, useTheme } from "@mui/material";
import FlexBox from "../components/Box/FlexBox";
import { H1, Paragraph } from "../components/Typography";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  const theme = useTheme();
  return <FlexBox p={4} height="100%" alignItems="center" flexDirection="column" justifyContent="center">
       
      <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Unauthorized Page. 
      </H1>
      <Paragraph color="text.disabled" fontWeight="500">
        Please Contact Admin.
      </Paragraph>

      <NavLink to="/dashboard" style={{
      display: "block",
      marginTop: "1.5rem",
      fontWeight: 600,
      textDecoration: "underline",
      color: theme.palette.primary.main
    }}>
        Back to Dashboard
      </NavLink>
    </FlexBox>;
};

export default ErrorPage;