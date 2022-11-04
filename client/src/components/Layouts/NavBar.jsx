import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import { AppBar,   IconButton, styled  } from "@mui/material";
import FlexBox from "../../components/Box/FlexBox";
import { SettingsContext } from "../../contexts/SettingsContext"; 
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useContext } from "react";
import { THEMES } from "../../theme/constants";
import {H3} from "../../components/Typography";
import StyledAvatar from "../../components/StyledAvatar";
import { useSelector } from "react-redux";
import {selectUser} from "../../redux/features/auth/authSlice";
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent"
}));
 
const StyledIconButton = styled(IconButton)(() => ({
  "&:hover": {
    backgroundColor: "transparent"
  }
}));

const DashboardNavbar = props => {
  const user = useSelector(selectUser);
  const {
    settings,
    saveSettings
  } = useContext(SettingsContext);

  const handleChangeTheme = theme => {
    saveSettings({ ...settings,
      theme
    });
  };


  return <DashboardNavbarRoot position="sticky">
    
<FlexBox justifyContent={"flex-end"} >
        

        {settings.theme === "light" ? <StyledIconButton disableRipple onClick={() => handleChangeTheme(THEMES.DARK)}>
            <DarkModeRoundedIcon />
          </StyledIconButton> : <StyledIconButton disableRipple onClick={() => handleChangeTheme(THEMES.LIGHT)}>
            <LightModeTwoToneIcon />
          </StyledIconButton>}
          <StyledAvatar src={user?.google.photos[0].value } sx={{
          width: 30,
          height: 30,
          ml: 1
        }} />
        <H3 sx={{
          ml: 1,
          color: "primary.dark"
        }}>{user?.google.displayName }</H3>
  
        
        </FlexBox>
      
    </DashboardNavbarRoot>;
};

export default DashboardNavbar;