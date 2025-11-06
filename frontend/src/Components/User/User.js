import React from "react";
import UserNav from "./UserNav"; // Navigation sidebar for user
import { useParams } from "react-router-dom"; // Used to get route parameter (like /user/:handle)
import EditProfile from "./EditProfile"; // Component to edit user profile
import UserForm from "./UserForm"; // Form for donation or request
import History from "../Util/History"; // Shows history (donations/requests)
import Camps from "./Camps"; // Shows available food donation camps

const User = () => {
  // useParams() is used to read the part of the URL after /user/
  // For example, if URL is /user/profile, then handle = "profile"
  const { handle } = useParams();

  // nav contains sidebar menu items with link, icon, and title
  const nav = [
    { to: "/user/profile", icon: "fa-user", title: "My Profile" },
    {
      to: "/user/donate",
      icon: "fa-hand-holding-medical",
      title: "Donate Food",
    },
    {
      to: "/user/donations",
      icon: "fa-clock-rotate-left",
      title: "Donation History",
    },
    {
      to: "/user/camps",
      icon: "fa-location-dot",
      title: "Food Donation Camps",
    },
    { to: "/user/request", icon: "fa-rotate", title: "Food Request" },
    {
      to: "/user/requests",
      icon: "fa-clock-rotate-left",
      title: "Request History",
    },
  ];

  return (
    <div className="flex w-full h-96">
      {/* Left side: Sidebar Navigation */}
      <UserNav data={nav} />

      {/* Right side: Main content changes based on 'handle' value from URL */}
      <div className="ml-96 w-full flex justify-center pr-24">
        {/* If user clicks "My Profile" */}
        {handle === "profile" && <EditProfile />}

        {/* If user clicks "Donate Food" */}
        {handle === "donate" && <UserForm />}

        {/* If user clicks "Food Request" */}
        {handle === "request" && <UserForm />}

        {/* If user clicks "Donation History" */}
        {handle === "donations" && <History user="user" handle={handle} />}

        {/* If user clicks "Request History" */}
        {handle === "requests" && <History user="user" handle={handle} />}

        {/* If user clicks "Food Donation Camps" */}
        {handle === "camps" && <Camps />}
      </div>
    </div>
  );
};

export default User;
