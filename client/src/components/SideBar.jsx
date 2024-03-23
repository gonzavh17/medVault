import { useState, useEffect } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false );
  const [logoutState, setLogoutState] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setLogoutState(false)

    } catch (error) {
      console.error("Error al realizar el logout:", error);
    }
  };

if(!logoutState) {
  navigate("/");
}

  return (
    <div className="flex h-screen">
      
      <Card
        className={`h-full w-[calc(100vw-20rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-width ease-in-out duration-300 transform ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex justify-center items-center m-5">
        <button className="top-4 left-4 absolute" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6"></Bars3Icon>
        </button>
      </div>
        <div className="mb-2 p-4"></div>
        <List>
          <Link to='/dashboard'>
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 p-2 ${
                  !isSidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                Home
              </span>
            </ListItem>
          </Link>
          <Link to="/patientList">
            <ListItem onClick={toggleSidebar}>
              <ListItemPrefix>
                <ClipboardDocumentListIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 p-1 ${
                  !isSidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                Patients
              </span>
            </ListItem>
          </Link>
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 p-2 ${
                !isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Calendar
            </span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 p-2 ${
                !isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Profile
            </span>
          </ListItem>
          <ListItem onClick={handleLogout} disabled={!isAuthenticated}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 p-2 ${
                !isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >Salir
            </span>
          </ListItem>
        </List>
      </Card>
      
    </div>
  );
}
