import { Box, styled } from "@mui/material";
import { Fragment, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./NavBar.jsx";
import DashboardSidebar from "./SideBar"; // styled components

const Wrapper = styled(Box)(({
  theme,
  show
}) => ({
  width: `calc(100% - ${show ? "320px" : "80px"})`,
  paddingLeft: "3rem",
  paddingRight: "3rem",
  transition: "all 0.3s",
  marginLeft: show ? 320 : 80,
  [theme.breakpoints.down(1200)]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem"
  }
}));
const InnerWrapper = styled(Box)(({
  theme
}) => ({
  [theme.breakpoints.up("lg")]: { 
    maxWidth: 1200,
    margin: "auto"
  }
}));

const DashboardLayout = ({
  children
}) => {
  const [sideBarLocked, setSideBarLocked] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const [openSecondarySideBar, setOpenSecondarySideBar] = useState(false);
  return <Fragment>
      <DashboardSidebar sideBarLocked={sideBarLocked} showMobileSideBar={showMobileSideBar} openSecondarySideBar={openSecondarySideBar} setOpenSecondarySideBar={() => setOpenSecondarySideBar(state => !state)} closeMobileSideBar={() => setShowMobileSideBar(false)} setSideBarLocked={() => setSideBarLocked(state => !state)} setShowMobileSideBar={() => setShowMobileSideBar(state => !state)} />

      <Wrapper show={openSecondarySideBar}>
        <InnerWrapper>
         <Navbar/>
          {children || <Outlet />}
        </InnerWrapper>
      </Wrapper>
    </Fragment>;
};

export default DashboardLayout;
 