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
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutState, setLogoutState] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { isAuthenticated } = useAuth();

  const handleShowConfirmationLogout = () => {
    confirmAlert({
      title: "Confirmar",
      message: "¿Estás seguro que deseas cerrar sesión?",
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            handleLogout();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLogoutState(true);
    } catch (error) {
      console.error("Error al realizar el logout:", error);
    }
  };

  useEffect(() => {
    if (logoutState) {
      confirmAlert({
        title: "Sesion cerrada exitosamente",
        buttons: [
          {
            label: "Continuar",
            onClick: () => window.location.reload(),
          },
        ],
      });
      navigate("/");
    }
  }, [logoutState]);

  return (
    <div className="flex h-screen overflow-hidden z-50">

      <div className="block">
        <button className="top-4 left-4 absolute" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Card component */}
      <div className={`h-full max-w-[20rem] pt-4 shadow-xl shadow-blue-gray-900/5 transition-all ease-in-out duration-300 transform ${
          isSidebarOpen ? "w-72" : "hidden md:w-full"
        } fixed w-20 bg-white`}
      >
        <div className="flex justify-center items-center m-5">
          <button className="top-4 left-4 absolute" onClick={toggleSidebar}>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        <List>
          <Link to="/dashboard">
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 px-2 ${
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
          <Link to='/calendar'>
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 px-2 ${
                !isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Calendar
            </span>
          </ListItem>
          </Link>
          <Link to="/profile">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 px-2 ${
                  !isSidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                Profile
              </span>
            </ListItem>
          </Link>
          <ListItem
            onClick={handleShowConfirmationLogout}
            disabled={!isAuthenticated}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 px-2 ${
                !isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Salir
            </span>
          </ListItem>
        </List>
      </div>
    </div>
  );
};
