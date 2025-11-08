import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ title, items = [], links = [] }) => {
  const buttonClass =
    "px-6 py-2 font-semibold text-base rounded-full group-hover:px-12 group-hover:drop-shadow-2xl shadow-sm bg-blood text-white hover:drop-shadow-md hover:opacity-80";

  const itemClass =
    "rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-nowrap font-semibold hover:bg-blood hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-red-700";

  return (
    <div className="group inline-block relative  dark:text-white-900">
      <button className="text-gray-700 font-semibold mx-4 rounded inline-flex">
        <span className={buttonClass}>
          {title} &nbsp;
          <svg
            className="fill-current inline h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>

      <ul className="ml-6 px-2 py-2 absolute hidden text-gray-700 pt-1 z-10 group-hover:block w-max bg-white dark:bg-gray-800 rounded-tl-lg rounded-b-lg shadow-lg">
        {items.map((item, i) => (
          <li key={i}>
            <Link to={links[i]} className={itemClass}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
