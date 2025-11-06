import React from "react";
import { Link } from "react-router-dom";

// Component for icon + title
const Temp = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true">
        <i className={`fa-solid ${icon}`}></i>
      </span>
      <span>{title}</span>
    </div>
  );
};

// Main UserNav component
const UserNav = ({ data }) => {
  // Tailwind classes for nav links
  const s1 =
    "block m-4 px-6 py-2 font-semibold text-lg rounded-full shadow-sm bg-gray-800 text-white hover:drop-shadow-md hover:opacity-80 dark:bg-gray-900 dark:text-white transition-colors duration-200";

  return (
    <nav className="fixed top-10 left-4 z-50 flex flex-col">
      {data.map((e) => (
        <Link key={e.to} to={e.to} className={s1}>
          <Temp icon={e.icon} title={e.title} />
        </Link>
      ))}
    </nav>
  );
};

export default UserNav;
