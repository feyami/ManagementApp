import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, styled, Tab } from "@mui/material";
import FlexBox from "../../components/Box/FlexBox";

import { H3 } from "../../components/Typography";


import useTitle from "../../hooks/useTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // styled components
import TeamKanban1 from "../../components/projectManagement/TeamKanban1";
const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));
const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}));
const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const UserProfile = () => {
  // change navbar title
  useTitle("User Profile");

  const { t } = useTranslation();
  const [value, setValue] = useState("1");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <StyledCard>
          <FlexBox
            flexWrap="wrap"
            padding="0 2rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <StyledTabList onChange={handleChange}>
              <StyledTab label={t("Information")} value="1" />
              <StyledTab label={t("Teams")} value="2" />
              <StyledTab label={t("Todos")} value="3" />
              <StyledTab label={t("Gallery")} value="4" />
            </StyledTabList>
          </FlexBox>
        </StyledCard>

        <Box marginTop={3}>
          <StyledTabPanel value="1">
            <H3>Information</H3>
          </StyledTabPanel>

          <StyledTabPanel value="2">
            <H3>Teams</H3>
          </StyledTabPanel>

          <StyledTabPanel value="3">
            
            <TeamKanban1 />
          </StyledTabPanel>

          <StyledTabPanel value="4">
            <H3>Gall</H3>
          </StyledTabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default UserProfile;
