import {
  AuthorizedRoute,
  GuestRoute,
  AdminRoute,
} from "./hooks/authentication/Guard";

import Layout from "./components/Layouts/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
 

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
const Error = Loadable(lazy(() => import("./pages/error")));
//const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));
const Login = Loadable(lazy(() => import("./pages/auth/Login")));
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
const ProjectDetail = Loadable(
  lazy(() => import("./pages/projectManagement/ProjectDetail"))
);
const Chat = Loadable(lazy(() => import("pages/chat/Chat")));
const Test = Loadable(lazy(() => import("./pages/Test")));
const Todo = Loadable(lazy(() => import("pages/Todo")));
//const UserGrid = Loadable(lazy(() => import("./pages/userManagement/UserGrid")));
//const AddNewUser = Loadable(lazy(() => import("./pages/userManagement/AddNewUser")));

const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthorizedRoute>
        <Layout />
      </AuthorizedRoute>
    ),
    children: [
      {
        path: "contact-list",
        element: <AuthorizedRoute><ContactList /></AuthorizedRoute>,
      },
      {
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
        path: "project-detail",
        element: <ProjectDetail />,
      },
      {
        path: "project-add",
        element: <AddProject />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "Todo",
        element: <Todo />,
      },
      {
        path: "test",
        element: (
          <AdminRoute>
            <Test />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
];
export default routes;
