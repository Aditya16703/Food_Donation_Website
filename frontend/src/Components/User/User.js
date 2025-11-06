import React from "react";
import UserNav from "./UserNav"; // Sidebar navigation
import { useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import UserForm from "./UserForm";
import History from "../Util/History";
import Camps from "./Camps";

const User = () => {
  const { handle } = useParams();

  const nav = [
    { to: "/user/profile", icon: "fa-user", title: "My Profile" },
    { to: "/user/donate", icon: "fa-hand-holding-medical", title: "Donate Food" },
    { to: "/user/donations", icon: "fa-clock-rotate-left", title: "Donation History" },
    { to: "/user/camps", icon: "fa-location-dot", title: "Food Donation Camps" },
    { to: "/user/request", icon: "fa-rotate", title: "Food Request" },
    { to: "/user/requests", icon: "fa-clock-rotate-left", title: "Request History" },
  ];

  // Map handle to component
  const componentMap = {
    profile: <EditProfile />,
    donate: <UserForm />,
    request: <UserForm />,
    donations: <History user="user" handle="donations" />,
    requests: <History user="user" handle="requests" />,
    camps: <Camps />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <UserNav data={nav} />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-6 sm:p-10 overflow-auto">
        {componentMap[handle] || <div>Select an option from the menu.</div>}
      </div>
    </div>
  );
};

export default User;
