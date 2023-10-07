import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import EmailHolde from "./component/EmailHolde";
import Buttons from "./component/Buttons";
import Inbox from "./component/Inbox";

const App = () => {
  return (
    <div className="container">
      <div className="first-div">
        <Navbar />
        <EmailHolde />
        <p className="P-TAG">
          Forget about spam, promotional mailings, hacking, and robot attacks.
          Keep your real mailbox clean and safe. Temp Mail provides temporary,
          secure, anonymous, free, and disposable email addresses.
        </p>
      </div>
      <div className="second-div">
        <Buttons />
      </div>
      <Inbox />
    </div>
  );
};

export default App;
