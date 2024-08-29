import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerLinks = [
    {
      FooterLinkName: "Navigation",
      Links: [
        {
          LinkName: "Browse",
        },
        {
          LinkName: "About",
        },
        {
          LinkName: "News",
        },
        {
          LinkName: "Privacy Policy",
        },
      ],
    },
    {
      FooterLinkName: "Contact Us",
      Links: [
        {
          LinkName: "Tria",
        },
        {
          LinkName: "FaceBook",
        },
        {
          LinkName: "Twitter",
        },
        {
          LinkName: "TikTok",
        },
      ],
    },
    {
      FooterLinkName: "Account",
      Links: [
        {
          LinkName: "Login",
        },
        {
          LinkName: "Register",
        },
        {
          LinkName: "Upgrade",
        },
      ],
    },
  ];

  return (
    <div className="footer-container relative text-white bg-black h-screenxs1 w-full flex flex-col items-center justify-around bg-gradient-to-t from-[#15252C] ...">
      <div className="footer-content-container flex flex-row w-[60%]">
        {footerLinks &&
          footerLinks.map((footerLink, index) => (
            <div
              key={index}
              className="navigation flex flex-col justify-center w-full items-center gap-5 text-center h-[70%]"
            >
              <h1 className="w-[40%] font-semibold">
                {footerLink.FooterLinkName}
              </h1>
              <div className="navigation-links flex flex-col  text-[#979696] w-[60%]">
                {footerLink.Links.map((link, index) => (
                  <Link key={index} href="#">
                    {link.LinkName}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="footer-line-container h-[1px] w-[60%] bg-[#323232] m-10"></div>
      <div className="copyright-statement p-10 text-[#979696]">
        <p>Copyright © 2024, All rights resereved.</p>
      </div>
    </div>
  );
};

export default Footer;
