import React from "react";
import bg from "../../assets/bgstart1.jpg";
import bg2 from "../../assets/food2.jpg";
import donationFact from "../../assets/abc.jpg";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";

const Home = () => {
  const foodTypes = [
    {
      food: "Non-Perishable Food",
      type: "Rice, flour, salt, spices, cooking oil, etc.",
    },
    {
      food: "Perishable Food",
      type: "Fruits, vegetables, milk, cheese, bread, etc.",
    },
    {
      food: "Prepared Food",
      type: "Restaurant leftovers, homemade dishes, catered meals, etc.",
    },
    {
      food: "Baby Food and Formula",
      type: "Infant cereals fortified with iron and other nutrients.",
    },
    {
      food: "Snacks and Beverages",
      type: "Nuts, dried fruits, crackers, chips, sports drinks, etc.",
    },
  ];

  const donationSteps = [
    { title: "Registration", img: g1 },
    { title: "Seeing", img: g2 },
    { title: "Donation", img: g3 },
    { title: "Save Life", img: g4 },
  ];

  return (
    <div className="dark:text-white-900 dark:bg-gray-bg bg-white min-h-screen">
      {/* Hero Section */}
      <img src={bg} alt="Food Donation Banner" className="mx-auto w-11/12 rounded-xl mt-4" />

      {/* Quote Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 place-items-center mt-6 px-8 md:px-24">
        <div className="w-full">
          <img
            draggable={false}
            src={bg2}
            className="rounded-2xl w-full object-cover"
            alt="Food Awareness"
          />
        </div>
        <div className="mt-6 md:mt-0 px-4 text-center">
          <p className="font-bold text-3xl md:text-4xl text-gray-dark dark:text-white-900 leading-snug">
            “Hunger is not an issue of charity. It is an issue of justice.” <br />
            <span className="text-blood text-xl">– Jacques Diouf</span>
          </p>
        </div>
      </div>

      {/* Know About Donation Section */}
      <h1 className="font-bold text-center text-blood my-8 text-2xl underline">
        Know About Donation
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16">
        <div className="flex-1 text-center">
          <img
            src={donationFact}
            alt="Donation Facts"
            className="rounded-2xl w-10/12 mx-auto mb-4"
          />
          <p className="text-sm md:text-base italic">
            <code>
              No adjective in the dictionary can define the feeling after you
              donate food to the needy. Food donation is an act of gratitude —
              a way to share blessings and ensure no one sleeps hungry.
            </code>
          </p>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="border-collapse border text-center mx-auto">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="border bg-blood text-white-900 font-bold py-2"
                >
                  Compatible Food Types You Can Donate
                </th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Food Types</th>
                <th className="border px-4 py-2">Contents</th>
              </tr>
            </thead>
            <tbody>
              {foodTypes.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 font-medium">{item.food}</td>
                  <td className="border px-4 py-2">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Food Donation Process */}
      <p className="text-2xl underline font-bold text-blood text-center mt-10 mb-6">
        Food Donation Process
      </p>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 place-items-center px-6 md:px-16">
        {donationSteps.map((step, index) => (
          <div
            key={index}
            className="border border-metal shadow-md rounded-xl overflow-hidden w-full md:w-11/12 bg-white dark:bg-gray-dark transition-transform duration-300 hover:scale-105"
          >
            <div className="grid md:grid-cols-2 grid-cols-1">
              <img
                src={step.img}
                draggable={false}
                className="w-full h-64 object-cover"
                alt={step.title}
              />
              <div className="m-4">
                <h1 className="font-bold text-lg text-midnight dark:text-white-900 mb-2">
                  {index + 1}. {step.title}
                </h1>
                <p className="text-justify text-sm md:text-base">
                  {step.title === "Registration" && (
                    <>
                      Register easily to become a food donor or receiver. Our
                      simple process ensures that every meal you share reaches
                      those who need it most.
                    </>
                  )}
                  {step.title === "Seeing" && (
                    <>
                      View available donations and nearby food banks in real
                      time. Get instant access to meals shared by kind donors
                      and help reduce food waste.
                    </>
                  )}
                  {step.title === "Donation" && (
                    <>
                      Donate your surplus food through our verified network.
                      Every contribution helps feed someone in need and promotes
                      a sustainable community.
                    </>
                  )}
                  {step.title === "Save Life" && (
                    <>
                      Your one small act of kindness can save lives. By donating
                      food, you are helping to fight hunger and bring hope to
                      those in need.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-blood text-white-900 mt-10 py-3 text-center font-bold text-sm">
        <code>FoodLink © {new Date().getFullYear()} — Made by Aditya</code>
      </footer>
    </div>
  );
};

export default Home;


































