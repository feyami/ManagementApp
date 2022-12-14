import { Box, Divider, List, ListItem, ListItemButton, styled, Tooltip, useMediaQuery } from "@mui/material";
import MyAccordion from "../accordion/MyAccordion";
import FlexBox from "../Box/FlexBox";
import { H3, Large } from "../Typography";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollBar from "simplebar-react";
import topMenuList from "./sideBarListData"; 
import MenuIcon from '@mui/icons-material/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useDispatch } from "react-redux";
import {logout} from "redux/features/auth/authSlice";
import {useCookies } from "react-cookie";
// root component interface

// custom styled components
 

const MainMenu = styled(Box)(({
  theme
}) => ({
  width: 80,
  height: "100%",
  position: "fixed",
  left: 0,
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.drawer + 11,
  transition: "left 0.3s ease",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    left: -80
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 7
  },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary
  }
}));
const SecondarySideBar = styled(Box)(({
  theme,
  show
}) => ({
  width: 240,
  height: "100%",
  position: "fixed",
  left: show ? 80 : -320,
  transition: "left 0.3s ease-in-out",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper
}));
const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "transparent"
  }
}));
const Dot = styled(Box)(() => ({
  width: 4,
  height: 4,
  marginRight: 10,
  borderRadius: "50%"
}));
const SubMenuItem = styled(FlexBox)(({
  theme,
  active
}) => ({
  cursor: "pointer",
  alignItems: "center",
  padding: "0.6rem 1rem",
  "& div": {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.text.disabled
  },
  "& small": {
    color: active ? theme.palette.primary.main : theme.palette.secondary[400]
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.divider,
    "& div": {
      backgroundColor: theme.palette.primary.main
    },
    "& small": {
      color: theme.palette.primary.main
    }
  }
})); // root component

const DashboardSideBar = ({
  sideBarLocked,
  showMobileSideBar,
  closeMobileSideBar,
  openSecondarySideBar,
  setOpenSecondarySideBar,
  setShowMobileSideBar,
  setSideBarLocked
  
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");
  const [activeSubMenuItem, setActiveSubMenuItem] = useState("");
  const [categoryMenus, setCategoryMenus] = useState([]);
  const downMd = useMediaQuery(theme => theme.breakpoints.down(1200));
  const handleToggleBtn = () => {
    if (downMd) {
      setShowMobileSideBar();
    } else {
      setSideBarLocked();
      setOpenSecondarySideBar();
    }
  };
  const handleActiveMainMenu = menuItem => () => {
    setActive(menuItem.title);

    if (menuItem.children && menuItem.children.length > 0) {
      setCategoryMenus(menuItem.children);
      const matched = openSecondarySideBar && active === menuItem.title;
      setOpenSecondarySideBar(matched ? false : true);
    } else {
      // console.log(!menuItem.path);
      navigate(menuItem.path);
      closeMobileSideBar();
      setOpenSecondarySideBar(sideBarLocked && !menuItem.path);
    }
  }; // accordion


  const [expanded, setExpanded] = useState("");
  useEffect(() => {
    if (categoryMenus && categoryMenus.length > 0) {

    setExpanded(categoryMenus[0].subTitle);}
  }, [categoryMenus]);

  const handleAccordionChange = panel => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSubMenuItem = path => {
    navigate(path);
    setActiveSubMenuItem(path);
    setOpenSecondarySideBar(sideBarLocked);
    closeMobileSideBar();
  }; // main menus content

  const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);

 const handleLogout = () => {
  removeCookie("connect.sid"); 
   
    dispatch(logout());
  };

 
  const mainSideBarContent = <List sx={{
    height: "100%"
  }}>
      <StyledListItemButton disableRipple onClick={handleToggleBtn}>
      <MenuIcon/>
      </StyledListItemButton>
<Divider />
      <ScrollBar style={{
      maxHeight: "calc(100% - 50px)"
    }}>
        {topMenuList.map((nav, index) => <Tooltip title={nav.title} placement="right" key={index}>
            <StyledListItemButton disableRipple onClick={handleActiveMainMenu(nav)}>
              <nav.Icon sx={{
            color: active === nav.title ? "primary.main" : "secondary.400"
          }} />
            </StyledListItemButton>
          </Tooltip>)}
           <Divider/>
           <StyledListItemButton disableRipple onClick={() => handleLogout()}>
      <LogoutRoundedIcon/>
      </StyledListItemButton>
      </ScrollBar>
    </List>;
   

      // secondary side bars content

  const secondarySideBarContent = <Fragment>
      <ListItem sx={{
      py: 2
    }}>
        <H3>{active}</H3>
      </ListItem>

      {categoryMenus&&categoryMenus.map((item, index) => item.subCategories ? <MyAccordion key={index} expandedItem={expanded} accordionHeader={item.subTitle} handleChange={handleAccordionChange}>
            {item.subCategories.map(sub => <SubMenuItem key={sub.name} active={sub.path === activeSubMenuItem} onClick={() => handleSubMenuItem(sub.path)}>
            <sub.Icon  sx={{marginRight:"5px",
             color: sub.path === activeSubMenuItem ? "primary.main" : "secondary.400"
          }} />
          
          <Divider orientation="vertical" flexItem />
            <Large marginLeft="5px" color= {sub.path === activeSubMenuItem ? "primary.main" : "secondary.400"}>{sub.name}</Large>
              </SubMenuItem>)}
          </MyAccordion> : <SubMenuItem key={item.subTitle} active={item.path === activeSubMenuItem} onClick={() => handleSubMenuItem(item.path)}>
            <item.Icon  sx={{marginRight:"5px",
             color: item.path === activeSubMenuItem ? "primary.main" : "secondary.400"
          }} />
          <Divider orientation="vertical" flexItem />
            <Large marginLeft="5px" color= {item.path === activeSubMenuItem ? "primary.main" : "secondary.400"}>{item.subTitle}</Large>
          </SubMenuItem>)}
    </Fragment>; // for mobile device

  if (downMd) {
    return <Fragment>
      <StyledListItemButton disableRipple onClick={handleToggleBtn}>
      <MenuIcon/>
      </StyledListItemButton>
        <Box sx={{
        width: 60,
        height: "100%",
        position: "fixed",
        zIndex: theme => theme.zIndex.drawer + 3,
        backgroundColor: theme => theme.palette.background.paper,
        boxShadow: theme => theme.shadows[1],
        "& .simplebar-track.simplebar-vertical": {
          width: 7
        },
        "& .simplebar-scrollbar:before": {
          background: theme => theme.palette.text.primary
        },
        transform: showMobileSideBar ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s"
      }}>
          {mainSideBarContent}
        </Box>

        {showMobileSideBar && <Box onClick={closeMobileSideBar} sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: theme => theme.zIndex.drawer
      }} />}

        <Box sx={{
        position: "fixed",
        left: showMobileSideBar ? 0 : -300,
        width: 300,
        height: "100%",
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: "background.paper",
        transition: "left 0.3s"
      }}>
          <Box sx={{
          height: "100%",
          position: "relative",
          width: "calc(100% - 60px)",
          marginLeft: "60px"
        }}>
            {secondarySideBarContent}
          </Box>
        </Box>
      </Fragment>;
  }

  return <Fragment>
      <MainMenu>{mainSideBarContent}</MainMenu>

      <SecondarySideBar show={openSecondarySideBar}>
        {secondarySideBarContent}
      </SecondarySideBar>
    </Fragment>;
};

export default DashboardSideBar;