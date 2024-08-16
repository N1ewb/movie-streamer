import React from "react";

const Footer = () => {
  return (
    <div className="footer-container relative top-[200px] text-white bg-black h-screenxs1 w-full flex flex-col items-center justify-around bg-gradient-to-t from-[#15252C] ...">
      <div className="footer-content-container flex flex-row w-[60%]">
        <div className="navigation flex flex-col justify-center w-full items-center gap-5 text-center">
          <h1 className="w-[40%]">Navigation</h1>
          <div className="navigation-links flex flex-col  text-[#979696] w-[60%]">
            <a>Browse</a>
            <a>About</a>
            <a>News</a>
            <a>Privacy Policy</a>
          </div>
        </div>
        <div className="contact flex flex-col justify-center w-full items-center gap-5 text-center">
          <h1 className="w-[40%]">Contact Us</h1>
          <div className="contact-links flex flex-col  text-[#979696] w-[60%]">
            <a>Tria</a>
            <a>Facebook</a>
            <a>Twitter</a>
            <a>Tiktok</a>
          </div>
        </div>
        <div className="account flex flex-col justify-center w-full items-center gap-5 text-center">
          <h1 className="w-[40%]">Account</h1>
          <div className="account-links flex flex-col  text-[#979696] w-[60%]">
            <a>Login</a>
            <a>Register</a>
            <a> </a>
            <a> </a>
            <a></a>
          </div>
        </div>
      </div>
      <div className="copyright-statement">
        <p>Copyright © 2024, All rights resereved.</p>
      </div>
    </div>
  );
};

export default Footer;
