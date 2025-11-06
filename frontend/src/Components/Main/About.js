import React from "react";

const About = () => {
  return (
    <div className="px-6 sm:px-12 lg:px-44 py-10 dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center underline mb-6">
        About Annadata
      </h1>

      <p className="text-lg sm:text-xl text-justify mb-6">
        <span className="font-semibold">Annadata</span> is a digital platform
        designed to bridge the gap between food donors and recipients. It allows
        individuals and organizations to register as donors or requestors and
        enables food banks to efficiently manage their inventory, schedule
        donation drives, and track pending requests.
      </p>

      <p className="text-lg sm:text-xl text-justify mb-6">
        The system ensures transparency and accountability by authenticating
        users through their registered mobile number and password. Once logged
        in, users can perform key actions such as donating, requesting, or
        managing food supplies with ease.
      </p>

      <p className="text-lg sm:text-xl text-justify">
        Beyond just donation management, Annadata promotes a culture of
        compassion and community service. By connecting donors, NGOs, and food
        banks in real time, it aims to reduce food waste and ensure that
        surplus food reaches those who need it most — one meal at a time.
      </p>
    </div>
  );
};

export default About;
