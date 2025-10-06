import React from 'react';
import { FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const SocialSidebar = () => {
  const socialLinks = [
    {
      href: "https://facebook.com",
      Icon: FaFacebookF,
      bgColor: "bg-[#1DA1F2]",
      name: "Facebook"
    },
    {
      href: "https://youtube.com",
      Icon: FaYoutube,
      bgColor: "bg-[#FF0000]",
      name: "YouTube"
    },
    {
      href: "https://linkedin.com",
      Icon: FaLinkedinIn,
      bgColor: "bg-[#0077B5]",
      name: "LinkedIn"
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
              ${link.bgColor}
            `}
          >
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-white"
              aria-label={link.name}
            >
              <link.Icon className="w-5 h-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialSidebar;