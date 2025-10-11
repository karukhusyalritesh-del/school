import React from 'react';
import { FaWhatsapp, FaViber, FaFacebookMessenger } from 'react-icons/fa';

const SocialSidebar = () => {
  // 🎯 Set icon size in one place
  const iconSize = 22; // change this number (e.g. 20, 25, 30) to resize all icons

  const socialLinks = [
    {
      href: "https://wa.me/9821775780",
      Icon: FaWhatsapp,
      bgColor: "bg-[#25D366]", // WhatsApp green
      name: "WhatsApp"
    },
    {
      href: "viber://chat?number=%2B9779821775780",
      Icon: FaViber,
      bgColor: "bg-[#7360F2]", // Viber purple
      name: "Viber"
    },
    {
      href: "https://m.me/yourusername", // Messenger link
      Icon: FaFacebookMessenger,
      bgColor: "bg-[#0084FF]", // Messenger blue
      name: "Messenger"
    }
  ];

  return (
    <nav className="fixed top-1/3 right-0 z-50">
      <ul className="p-0">
        {socialLinks.map((link, index) => (
          <li 
            key={index}
            className={`
              block my-1 mx-1 p-2 sm:p-3 text-center 
              rounded-[50px_50px_0_50px] 
              transition-all duration-500 ease-in-out 
              hover:scale-125 hover:-translate-y-2.5 
              hover:bg-black hover:bg-opacity-50 
              cursor-pointer ${link.bgColor}
            `}
          >
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-white"
              aria-label={link.name}
            >
              <link.Icon size={iconSize} /> {/* 👈 Use one size for all */}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialSidebar;
