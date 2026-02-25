import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json"; // State & district data
import { useParams } from "react-router-dom";
import axios from "../Api"; // Custom axios instance
import AuthContext from "../context/AuthContext"; // Context for authentication

const EditProfile = () => {
  const { handle } = useParams(); // To get parameter from URL if needed
  const { getLoggedIn, user } = useContext(AuthContext); // Access logged-in user info & refresh function

  // Form state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [food, setFood] = useState(0);
  const [edit, setEdit] = useState(true); // Used to toggle edit/view mode

  // Different food donation categories
  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];

  // ---------------------- USE EFFECT ----------------------
  // Runs once when the component loads
  useEffect(() => {
    if (user) {
      // Prefill form with user data
      setName(user.name || "");
      setAge(user.age || 0);
      setGender(user.gender || "male");
      setMail(user.email || "");
      setPhone(user.phone || "");

      let stateIdx = 0;
      let districtIdx = 0;
      // Find indexes of user's state and district
      data.states.forEach((e, i) => {
        if (e.state === user.state) {
          stateIdx = i; // Match state
          const dIdx = e.districts.indexOf(user.district);
          districtIdx = dIdx !== -1 ? dIdx : 0; // Match district
        }
      });
      setState(stateIdx);
      setDistrict(districtIdx);

      // Set default dummy password for display (not editable)
      setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
      setAddress(user.address || "");
      const fIdx = foodGroups.indexOf(user.foodGroup);
      setFood(fIdx !== -1 ? fIdx : 0);
    }
  }, [user]); // Added dependency 'user' for safer data loading
  // -------------------------------------------------------

  // ---------------------- UPDATE FUNCTION ----------------------
  // Sends updated user data to backend
  const update = async () => {
    const formData = {
      name,
      age,
      gender,
      foodGroup: foodGroups[food],
      email: mail,
      phone,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address,
    };

    try {
      await axios.put(`/user/`, formData);
      setEdit(true); // Disable edit mode again
      await getLoggedIn(); // Refresh context data
      alert("User updated successfully");
    } catch (error) {
      alert("User not updated");
    }
  };
  // ------------------------------------------------------------

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-secondary-900 dark:text-white-900 mb-2">My Profile</h1>
          <p className="text-secondary-500 font-medium">Manage your personal information and preferences.</p>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setEdit(!edit)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg flex items-center space-x-2 ${
              edit 
                ? "bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-white-900" 
                : "bg-error text-white-900 shadow-error/20"
            }`}
          >
            <i className={`fa-solid ${edit ? "fa-pen-to-square" : "fa-xmark"}`}></i>
            <span>{edit ? "Edit Profile" : "Cancel"}</span>
          </button>

          {!edit && (
            <button
              onClick={update}
              className="px-8 py-3 rounded-2xl font-bold bg-primary-600 text-white-900 shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center space-x-2"
            >
              <i className="fa-solid fa-check"></i>
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-white-900/20 shadow-premium flex flex-col items-center text-center">
            <div className="relative mb-6">
                <div className="h-32 w-32 rounded-[2rem] bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white-900 text-5xl shadow-xl">
                    {name ? name.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
                </div>
                {!edit && (
                    <button className="absolute -bottom-2 -right-2 h-10 w-10 bg-white-100 dark:bg-secondary-800 rounded-xl shadow-lg border border-primary-500/20 text-primary-600 flex items-center justify-center hover:scale-110 transition-transform">
                        <i className="fa-solid fa-camera text-sm"></i>
                    </button>
                )}
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white-900">{name || "Donor Name"}</h2>
            <p className="text-primary-600 font-bold text-sm tracking-widest uppercase mt-1">Certified Donor</p>
            
            <div className="w-full mt-10 pt-10 border-t border-secondary-100 dark:border-secondary-800 space-y-4">
                <div className="flex justify-between items-center px-2">
                    <span className="text-secondary-400 text-xs font-bold uppercase tracking-wider">Member Since</span>
                    <span className="text-secondary-900 dark:text-white-900 font-bold">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center px-2">
                    <span className="text-secondary-400 text-xs font-bold uppercase tracking-wider">Impact Score</span>
                    <span className="h-8 px-3 bg-success/10 text-success rounded-lg flex items-center font-bold text-sm">
                        <i className="fa-solid fa-bolt mr-2"></i> 850
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
          {/* Main Info Card */}
          <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-10 border border-white-900/20 shadow-premium">
            <div className="flex items-center space-x-4 mb-8">
                <div className="h-10 w-1 bg-primary-600 rounded-full"></div>
                <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                      <i className="fa-solid fa-signature"></i>
                  </div>
                  <input
                    className="input-field dark:bg-secondary-900/50 pl-11"
                    type="text"
                    disabled={edit}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Age</label>
                  <input
                    className="input-field dark:bg-secondary-900/50"
                    type="number"
                    disabled={edit}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Gender</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                      disabled={edit}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                      <i className="fa-solid fa-envelope"></i>
                  </div>
                  <input
                    className="input-field dark:bg-secondary-900/50 pl-11"
                    type="email"
                    disabled={edit}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
                      <i className="fa-solid fa-phone"></i>
                  </div>
                  <input
                    className="input-field dark:bg-secondary-900/50 pl-11"
                    type="tel"
                    disabled={edit}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Location */}
          <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-10 border border-white-900/20 shadow-premium">
             <div className="flex items-center space-x-4 mb-8">
                <div className="h-10 w-1 bg-success rounded-full"></div>
                <h3 className="text-lg font-display font-bold text-secondary-900 dark:text-white-900 uppercase tracking-wider">Preferences & Location</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Primary Food Donation Group</label>
                <div className="relative">
                  <select
                    className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                    disabled={edit}
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  >
                    {foodGroups.map((e, i) => (
                      <option key={i} value={i}>{e}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">State</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                      disabled={edit}
                      value={state}
                      onChange={(e) => {
                        setState(Number(e.target.value));
                        setDistrict(0);
                      }}
                    >
                      {data.states.map((e, i) => (
                        <option key={i} value={i}>{e.state}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">District</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none dark:bg-secondary-900/50 pr-8"
                      disabled={edit}
                      value={district}
                      onChange={(e) => setDistrict(Number(e.target.value))}
                    >
                      {data.states[state].districts.map((e, i) => (
                        <option key={i} value={i}>{e}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary-500 dark:text-white-400 ml-1">Permanent Address</label>
                <textarea
                  className="input-field dark:bg-secondary-900/50 min-h-[100px] pt-3"
                  placeholder="Street, Landmark, City, Pincode"
                  disabled={edit}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
