//import AuthGuard from 'components/authentication/AuthGuard';
//import GuestGuard from 'components/authentication/GuestGuard';
import DashboardLayout from "./components/Layouts/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

//const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

const ContactList = Loadable(
  lazy(() => import("./pages/contactManagement/ContactList"))
);
const AddContact = Loadable(
  lazy(() => import("./pages/contactManagement/AddContact"))
);
const CustomerList = Loadable(
  lazy(() => import("./pages/customerManagement/CustomerList"))
);
const AddCustomer = Loadable(
  lazy(() => import("./pages/customerManagement/AddCustomer"))
);
const ProjectList = Loadable(
  lazy(() => import("./pages/projectManagement/ProjectList"))
);
const AddProject = Loadable(
  lazy(() => import("./pages/projectManagement/AddProject"))
);
const Test = Loadable(lazy(() => import("./pages/Test")));
//const UserGrid = Loadable(lazy(() => import("./pages/userManagement/UserGrid")));
//const AddNewUser = Loadable(lazy(() => import("./pages/userManagement/AddNewUser")));

const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />, 
  },
  {
    path: "dashboard",
    element: (
      //<AuthGuard>
      <DashboardLayout />
      //</AuthGuard>
    ),
    children: [
       
      {
        path: "contact-list",
        element: <ContactList />,
      },{
        path: "contact-add",
        element: <AddContact />,
      },
      {
        path: "customer-list",
        element: <CustomerList />,
      },
      {
        path: "customer-add",
        element: <AddCustomer />,
      },
      {
        path: "project-list",
        element: <ProjectList />,
      },
      {
        path: "project-add",
        element: <AddProject/>,
      },
      {
        path: "test",
        element: <Test />, 
            },
    ],
  },
];
export default routes;
