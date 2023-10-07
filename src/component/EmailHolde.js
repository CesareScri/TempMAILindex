import React, { useState, useEffect } from "react";

const CopySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-clipboard2-fill"
    viewBox="0 0 16 16"
  >
    <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
    <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z" />
  </svg>
);

const CopiedSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-check-lg"
    viewBox="0 0 16 16"
  >
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
  </svg>
);

const EmailHolder = () => {
  const [email, setEmail] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const getNewEmail = async () => {
    try {
      const request = await fetch("http://localhost:4000/api/new");
      const response = await request.json();
      setEmail(response.emailID); // Assuming the response directly contains the email
      localStorage.setItem("userEmail", JSON.stringify(response.emailID)); // Store email to localStorage
      setIsloading(false);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
      setIsloading(false);
    } else {
      getNewEmail(); // Only fetch a new email if there's no email in localStorage
    }
  }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="email-holder">
      <h2>Your email address</h2>
      <div className="email-container">
        <input type="text" readOnly value={isLoading ? "Loading..." : email} />
        <button onClick={handleClick}>
          {isCopied ? <CopiedSVG /> : <CopySVG />}
        </button>
      </div>
    </div>
  );
};

export default EmailHolder;
