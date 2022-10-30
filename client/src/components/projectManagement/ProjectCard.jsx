import { useState,useEffect } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { AvatarGroup, Box, Card, IconButton, LinearProgress,Tooltip,Button } from "@mui/material";
import AddIconButton from "../../components/Button/AddIconButton";
import FlexBox from "../../components/Box/FlexBox";
import { H3, H6, Paragraph, Small } from "../../components/Typography";
import StyledAvatar from "../../components/StyledAvatar";
import ProjectCardMenu from "../../components/projectManagement/ProjectCardMenu";
import {CheckDueDateWithToolTip, CheckPassedDateWithToolTip} from "../Button/DateButtonWithToolTip";
 
const ProjectCard = ({
  handleMoreClick,
  project,
  setIsModalOpen,
  setEditProject
}) => {

  const {title,description, customer, startDate, endDate, progress,teamMembers} = project;

  const [projectMoreEl, setProjectMoreEl] = useState(null);
  const handleProjectMoreOpen = event => {
    setProjectMoreEl(event.currentTarget);
  };
  const handleProjectMoreClose = () => setProjectMoreEl(null);

  return <Card sx={{
    padding: 2,
    boxShadow: 2
  }}>
      <FlexBox alignItems="center" justifyContent="space-between">
        
        <CheckPassedDateWithToolTip date={startDate} isWithTime={false} />
        <IconButton sx={{
        padding: 0
      }} onClick={handleProjectMoreOpen}>
          <MoreHoriz />
        </IconButton>
        
      </FlexBox>
<Tooltip title={description} placement="top">  
      <Box sx={{
      textAlign: "center",
      pt: 6,
      pb: 4
    }}>
    
        <H3 >{title}</H3>
        <H6 color="text.disabled" fontWeight={500} mt={0.5}>
          {customer[0].companyName}
        </H6>
      </Box>
</Tooltip>
      {/* <FlexBox justifyContent="space-between" py={1}>
        <Paragraph fontWeight={600}>Project Progress</Paragraph>
        <Paragraph fontWeight={600}>32%</Paragraph>
      </FlexBox> 

       <LinearProgress variant="determinate" value={32} /> */}

      <FlexBox alignItems="center" justifyContent="space-between" pt="1.5rem">
        <FlexBox alignItems="center">
          <AvatarGroup>
            <StyledAvatar alt="Feyami" src="" />
            <StyledAvatar alt="Ali" src="" />
          </AvatarGroup>
          <AddIconButton sx={{
          marginLeft: 0
        }} />
        </FlexBox>
         
        <ProjectCardMenu anchorEl={projectMoreEl} handleMoreClose={handleProjectMoreClose} project={project} setIsModalOpen={setIsModalOpen} setEditProject={setEditProject}/>
        <CheckDueDateWithToolTip date={endDate} isWithTime={false}/>
       
        
          
         
        
         
      </FlexBox>
    </Card>;
};

export default ProjectCard;