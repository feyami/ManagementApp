import { Add } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab, useMediaQuery } from "@mui/material";
import FlexBox from "../../components/Box/FlexBox";

import SearchInput from "../../components/SearchInput";
import { H2, H6, Small } from "../../components/Typography";
import ProjectCard from "../../components/projectManagement/ProjectCard";
import useTitle from "../../hooks/useTitle";
import { useState,useEffect } from "react";
import AddProject from "../../pages/projectManagement/AddProject"; 
import { useSelector, useDispatch } from "react-redux";
import {getProjects} from "../../redux/features/project/projectSlice";

 

const TopAreaWrapper = styled(Card)(({
  theme
}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
  [theme.breakpoints.down(700)]: {
    "& h2": {
      paddingTop: "1rem"
    },
    "& img": {
      display: "none"
    }
  }
}));
const StyledTabList = styled(TabList)(({
  theme
}) => ({
  "& .MuiTabs-flexContainer .MuiButtonBase-root": {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderBottom: "2px solid",
    borderColor: theme.palette.divider
  },
  "& .MuiTabs-flexContainer .Mui-selected": {
    color: theme.palette.text.primary
  },
  [theme.breakpoints.down(1064)]: {
    maxWidth: 600
  },
  [theme.breakpoints.between(700, 838)]: {
    maxWidth: 475
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320
  }
}));

const ProjectList = () => {
   
  useTitle("Project List");
  const [value, setValue] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
const [editProject, setEditProject] = useState(null);


 useEffect(() => {
    dispatch(getProjects()); 
  }, [dispatch, isModalOpen]);


const handleChangeModalOpen = () => {
    setIsModalOpen(!isModalOpen);
};  
    

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  
  const tabItems = [{
    title: "All",
    amount: projects.length,
  }, {
    title: "Just Started",
    amount: ""
  }, {
    title: "Waiting for Approval",
    amount: ""
  }, {
    title: "In Progress",
    amount: ""
  }, {
    title: "Completed",
    amount: ""
  }];

 


 

 
  return <Box pt={2} pb={4}>
      <TopAreaWrapper>
        <Box>
          <H2 paddingLeft={3} paddingBottom={1}>
            Projects
          </H2>
          <TabContext value={value}>
            <StyledTabList variant="scrollable" onChange={handleChange}>
              {tabItems.map(item => <Tab disableRipple key={item.title} value={item.title.split(" ").join("-").toLowerCase()} label={<FlexBox alignItems="center">
                      <H6>{item.title}</H6>
                      <Small sx={{
                marginLeft: 1,
                padding: "0px 10px",
                borderRadius: "10px",
                backgroundColor: "divider"
              }}>
                        {item.amount}
                      </Small>
                    </FlexBox>} />)}
            </StyledTabList>
          </TabContext>
        </Box>
        
      </TopAreaWrapper>

      <Grid container spacing={3} paddingTop={3}>
        <Grid item xs={12}>
          <FlexBox justifyContent="space-between" flexWrap="wrap">
            <SearchInput placeholder="Find Projects" sx={{
            maxWidth: downSM ? "100%" : 270,
            marginBottom: downSM ? 1 : 0
          }} />
            <Button fullWidth={downSM} variant="contained" startIcon={<Add />} onClick={() => setIsModalOpen(true)} sx={{
            fontSize: 12
          }}>
              Create a project
            </Button>
            <AddProject open={isModalOpen} setOpenModal={setIsModalOpen} edit={false} data={editProject}/>
          </FlexBox>
        </Grid>

        {projects.map((project, index) => <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard project={project} setIsModalOpen={setIsModalOpen}  setEditProject={setEditProject} />
          </Grid>)}
       
      </Grid>
    </Box>;
};


export default ProjectList;