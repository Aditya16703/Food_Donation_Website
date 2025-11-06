import React from "react";
import { Link } from "react-router-dom"; // Removed "Outlet" because it was not used

// Destructured props directly for cleaner code
const Temp = ({ icon, title }) => {
  return (
    <>
      {/* Shows an icon and title with some spacing */}
      <i className={`fa-solid ${icon}`}></i>&nbsp;&nbsp;&nbsp;
      {title}
    </>
  );
};

// Destructured props here too for simplicity
const UserNav = ({ data }) => {
  // Fixed Tailwind colors (bg-gray → bg-gray-800, text-white-900 → text-white)
  const s1 =
    "block m-9 ml-20 px-9 py-2 font-semibold text-lg rounded-full shadow-sm bg-gray-800 text-white hover:drop-shadow-md hover:opacity-80";

  return (
    <div className="fixed">
      {data.map((e, index) => (
        //  Added key={index} → React needs a unique key for each list item
        <Link key={index} to={e.to} className={s1}>
          <Temp icon={e.icon} title={e.title} />
        </Link>
      ))}
    </div>
  );
};

export default UserNav;
