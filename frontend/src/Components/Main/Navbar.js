import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Outlet, Link } from "react-router-dom";
import DropDown from "../Util/DropDown";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
  const s1 =
    "bg-white drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium hover:drop-shadow-xl hover:px-10 dark:hover:bg-midnight dark:hover:drop-shadow-dark-lg";
  const [theme, setTheme] = useState(0);
  const { getLoggedIn } = useContext(AuthContext);
  const doc = document.documentElement.classList;

  useEffect(() => {
    let t = localStorage.getItem("theme");
    if (!t) {
      localStorage.setItem("theme", "0");
      t = "0";
    }
    setTheme(Number(t));
    if (t === "1") doc.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 0 ? 1 : 0;
    localStorage.setItem("theme", String(newTheme));
    setTheme(newTheme);
    if (newTheme === 1) doc.add("dark");
    else doc.remove("dark");
  };

  return (
    <>
      <nav className="p-3 bg-white sticky top-0 z-10 dark:bg-gray-bg">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center">
              <img
                className="h-14 w-auto ml-6 rounded-full"
                src={logo}
                draggable={false}
                alt="Annadata Logo"
              />
              <div className="text-2xl font-bold ml-2  text-green dark:text-white ">
                Annadata
              </div>
            </div>
          </Link>

          <div className="flex items-center">
            <DropDown
              title="About Us"
              children={["Home", "About Annadata", "Contact Us"]}
              links={["/", "/about", "/contactUs"]}
            />

            {props.logIn ? (
              <>
                <Link to={`/${props.user}/profile`} className={s1}>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link
                  to="/"
                  onClick={async () => {
                    try {
                      await axios.get("/auth/logout", { withCredentials: true });
                      await getLoggedIn();
                    } catch {
                      alert("Logout failed, please try again");
                    }
                  }}
                  className={s1}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <DropDown
                  title="Looking For Food"
                  children={["User Login/Register", "Food Bank Directory"]}
                  links={["/register/patient", "/bloodDirect"]}
                />
                <DropDown
                  title="Want To Donate Food"
                  children={[
                    "Food Donor Login/Register",
                    "Food Donation Camps",
                    "About Food Donation",
                  ]}
                  links={[
                    "/register/donor",
                    "/bloodCamps",
                    "/aboutBloodDonation",
                  ]}
                />
                <DropDown
                  title="Food Bank Login"
                  children={["Login", "Add Your Foodbank"]}
                  links={["/login/bank", "/register/bank"]}
                />
              </>
            )}

            <button
              className="mx-2 px-3 py-2 rounded-full bg-green-500 hover:shadow-lg"
              onClick={toggleTheme}
            >
              <i
                className={`dark:text-white fa-solid fa-lg fa-${
                  theme === 0 ? "sun" : "moon"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
