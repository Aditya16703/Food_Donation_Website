import React from "react";
import cc from "../../assets/abcd.jpg";

const Contact = () => {
  const data = [
    {
      title: "Annadata Related Queries, Feedback and Suggestions",
      body: [
        "Galgotias College of Engineering and Technology",
        "Knowledge Park 3, Greater Noida, Uttar Pradesh, India",
        "Email: annadata@cdac.in",
      ],
    },
    {
      title: "For Administrative Queries",
      body: [
        "Food Cell, National Food Corporation",
        "Ministry of Health & Family Welfare, New Delhi - 110011",
      ],
    },
  ];

  return (
    <div className="px-6 md:px-24 lg:px-64 py-8 dark:text-white-900">
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-6 text-blood  dark : text-white">
        Contact Details
      </h1>

      <div className="flex flex-col md:flex-row justify-around items-center gap-10">
        {/* Contact Info Section */}
        <div className="flex-1 w-full">
          {data.map((section, i) => (
            <div key={i} className="mb-8">
              <p className="text-xl font-bold underline mb-3">
                {section.title}
              </p>
              <div className="text-md text-gray-dark dark:text-white-900">
                {section.body.map((line, j) => (
                  <p key={j} className="mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={cc}
            draggable={false}
            className="rounded-3xl w-10/12 md:w-9/12 shadow-lg hover:scale-105 transition-transform duration-300"
            alt="Contact Office"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
