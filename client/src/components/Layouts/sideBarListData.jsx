import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
const index = [
  {
    title: "Home",
    Icon: HomeIcon,
  },
  {
    title: "Contact Management",
    Icon: PeopleOutlineIcon,
    children: [
      {
        subTitle: "Contacts",
        Icon: RecentActorsIcon,
        path: "/dashboard/contact-list",
      },{
        subTitle: "Add Contact",
        Icon: PersonAddAltIcon,
        path: "/dashboard/contact-add",
      },
      {
        subTitle: "Favorite Contacts",
        subCategories: [
          {
            name: "Contact",
            Icon: RecentActorsIcon,
            path: "/dashboard/Contact",
          },
          {
            name: "Contact",
            Icon: RecentActorsIcon,
            path: "/dashboard/Contact",
          },
          {
            name: "Contact",
            Icon: RecentActorsIcon,
            path: "/dashboard/Contact",
          },
        ],
        Icon: RecentActorsIcon,
        path: "/dashboard/contact-list",
      },
    ],
  },
  {
    title: "Customer Management",
    Icon: FactoryOutlinedIcon,
    children: [
      {
        subTitle: "Customers",
        Icon: FactoryOutlinedIcon,
        path: "/dashboard/customer-list",
      },{
        subTitle: "Add Customer",
        Icon: AddBusinessOutlinedIcon,
        path: "/dashboard/customer-add",
      },
      {
        subTitle: "Favorite customers",
        subCategories: [
          {
            name: "Customer",
            Icon: RecentActorsIcon,
            path: "/dashboard/customer",
          },
          {
            name: "Customer",
            Icon: RecentActorsIcon,
            path: "/dashboard/customer",
          },
          {
            name: "Customer",
            Icon: RecentActorsIcon,
            path: "/dashboard/customer",
          },
        ],
        Icon: RecentActorsIcon,
        path: "/dashboard/customer-list",
      },
    ],
  },{
    title: "Project Management",
    Icon: AccountTreeOutlinedIcon,
    path: "/dashboard/project-list",
    children: [
      {
        subTitle: "Projects",
        Icon: AccountTreeOutlinedIcon,
        path: "/dashboard/project-list",
      },{
        subTitle: "Add Project",
        Icon: AddToQueueOutlinedIcon,
        path: "/dashboard/project-add",
      },
      {
        subTitle: "Favorite Projects",
        subCategories: [
          {
            name: "Project",
            Icon: RecentActorsIcon,
            path: "/dashboard/project",
          },
          {
            name: "Project",
            Icon: RecentActorsIcon,
            path: "/dashboard/project",
          },
          {
            name: "Project",
            Icon: RecentActorsIcon,
            path: "/dashboard/project",
          },
        ],
        Icon: AccountTreeOutlinedIcon,
        path: "/dashboard/project-list",
      },
    ],
  },{
    title: "Team Management",
    Icon: GroupsOutlinedIcon,
    path: "/dashboard/test",
    children: [
      {
        subTitle: "Teams",
        Icon: GroupsOutlinedIcon,
        path: "/dashboard/test",
      },{
        subTitle: "Add Team",
        Icon: GroupAddOutlinedIcon,
        path: "/dashboard/team-add",
      },
      {
        subTitle: "Favorite Teams",
        subCategories: [
          {
            name: "Team",
            Icon: RecentActorsIcon,
            path: "/dashboard/team",
          },
          {
            name: "Team",
            Icon: RecentActorsIcon,
            path: "/dashboard/team",
          },
          {
            name: "Team",
            Icon: RecentActorsIcon,
            path: "/dashboard/team",
          },
        ],
        Icon: AccountTreeOutlinedIcon,
        path: "/dashboard/team-list",
      },
    ],
  },{
    title: "Project Management",
    Icon: LogoutRoundedIcon,
    path: "/dashboard/project-list",
  }
];
export default index;
