import { Button, Card, styled } from "@mui/material";
import FlexBox from "../../components/Box/FlexBox";
import { H1 } from "../../components/Typography";
import GitHubIcon from "../../assets/icons/GitHubIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";

const SocialIconButton = styled(Button)(({ theme }) => ({
  width: "48%",
  height: 48,
  fontSize: 13,
  borderRadius: "6px",
  border: "2px solid",
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.divider,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem",
  },
}));

const Login = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const google = () => {
    window.open(BACKEND_URL + "/auth/google", "_self");
  };

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: {
          sm: "100%",
        },
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 650,
          boxShadow: 1,
        }}
      >
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <H1 fontSize={24} fontWeight={700} mb={5}>
            Log In
          </H1>
          <FlexBox justifyContent="space-between" flexWrap="wrap" mx="2rem">
            <SocialIconButton
              onClick={google}
              startIcon={
                <GoogleIcon
                  sx={{
                    m: 1,
                  }}
                />
              }
            >
              Log in with Google
            </SocialIconButton>

            <SocialIconButton
              onClick={google}
              startIcon={
                <GitHubIcon
                  sx={{
                    m: 1,
                  }}
                />
              }
            >
              Log in with GitHub
            </SocialIconButton>
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
