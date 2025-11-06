import React from "react";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";

const AboutDonation = () => {
  const data = [
    {
      title: "Registration",
      img: g1,
      description: `Begin your journey of giving by registering with our food donation
      platform. Provide your basic details to help us coordinate your
      contributions efficiently. Once registered, you’ll receive guidance
      on nearby collection centers, donation timings, and food handling
      safety tips.`,
    },
    {
      title: "Seeing",
      img: g2,
      description: `After registration, you can explore the list of verified donation
      centers and ongoing drives. See where your contribution will make
      the biggest impact. Transparency is key — you can view photos,
      locations, and testimonials from recipients to understand how your
      donations help.`,
    },
    {
      title: "Donation",
      img: g3,
      description: `This is where kindness turns into action. Bring your food items to
      the nearest collection point or schedule a pickup. We accept
      non-perishable goods, packed meals, and essentials. Our volunteers
      ensure that each donation is checked, packed, and distributed with
      care to those who need it most.`,
    },
    {
      title: "Save Life",
      img: g4,
      description: `Every act of giving saves a life. By donating food, you provide
      nourishment, hope, and strength to those battling hunger. Together,
      we can reduce food waste and ensure no one sleeps hungry. Your
      simple act of compassion can inspire others to do the same — making
      a lasting difference in your community.`,
    },
  ];

  return (
    <section className="grid place-items-center dark:text-white">
      <div className="container px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Donation Process</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Follow the simple steps below to make a meaningful impact through food donation.
          </p>
        </div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {data.map((e, i) => (
            <div
              key={i}
              className="border border-gray-300 dark:border-gray-700 shadow-md rounded-xl overflow-hidden max-w-[90%] transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
            >
              <img
                src={e.img}
                draggable={false}
                className="w-full h-48 object-cover"
                alt={e.title}
              />
              <div className="p-4">
                <h1 className="font-bold text-lg text-midnight dark:text-white mb-2">
                  {i + 1}. {e.title}
                </h1>
                <p className="text-justify text-gray-700 dark:text-gray-300 text-sm">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDonation;
