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
   project, 
}) => {

  const {title,description, customer, startDate, endDate, progress,teamMembers} = project;
console.log("project",project);
  const [projectCardMenuClickedElement, setProjectCardMenuClickedElement] = useState(null);
  const handleProjectCardMenuOpen = event => {
    setProjectCardMenuClickedElement(event.currentTarget);
  };
  const handleProjectCardMenuClose = () => setProjectCardMenuClickedElement(null);

  return <Card sx={{
    padding: 2,
    boxShadow: 2
  }}>
      <FlexBox alignItems="center" justifyContent="space-between">
        
        <CheckPassedDateWithToolTip date={startDate} isWithTime={false} />
        <IconButton sx={{
        padding: 0
      }} onClick={handleProjectCardMenuOpen}>
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
          {customer?.companyName}
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
         
        <ProjectCardMenu anchorElement={projectCardMenuClickedElement} handleProjectCardMenuClose={handleProjectCardMenuClose} project={project} />
        <CheckDueDateWithToolTip date={endDate} isWithTime={false}/>
       
        
          
         
        
         
      </FlexBox>
    </Card>;
};

export default ProjectCard;