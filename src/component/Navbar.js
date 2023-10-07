import React from "react";
import MailLogo from "../assets/img/mail.png";
const Navbar = () => {
  return (
    <nav>
      <img src={MailLogo} />
      <h1>
        Lexa <span>Mail</span>
      </h1>
    </nav>
  );
};

export default Navbar;
