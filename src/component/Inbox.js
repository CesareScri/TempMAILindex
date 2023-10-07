import React, { useState, useEffect } from "react";
import Mail from "../assets/img/emptyMail.png";
import RecivedMail from "./RecivedMail";
import ShowEmailBody from "./ShowEmailBody";

const EmptyBox = () => {
  return (
    <div className="empty-box">
      <img src={Mail} />
      <h3>Your inbox is empty.</h3>
      <p>Waiting for incoming emails.</p>
    </div>
  );
};

const Inbox = () => {
  const email = JSON.parse(localStorage.getItem("userEmail"));
  const [isLoading, setIsloading] = useState(true);
  const [emailDATA, setEmailData] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const getInbox = async () => {
    try {
      const request = await fetch(`http://localhost:4000/api/inbox=${email}`);
      const response = await request.json();
      // console.log("response", response);
      setIsloading(false);
      if (response.msg === "No message.") {
        setIsloading(false);
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setIsloading(false);
        setEmailData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call getInbox immediately when the component mounts
    getInbox();

    // Set up an interval to call getInbox every 5 seconds
    const intervalId = setInterval(getInbox, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const getMessages = (id) => {
    setSelectedMessageId(id);
  };

  const backToInbox = () => {
    setSelectedMessageId(null);
  };

  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <p>Sender</p>
        <p>Subject</p>
        <p>Open</p>
      </div>
      <div className="inbox-body">
        {selectedMessageId ? (
          <div className="body-email-container">
            <button onClick={backToInbox}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              Back to Inbox
            </button>
            <ShowEmailBody id={selectedMessageId} />
          </div>
        ) : isEmpty ? (
          <EmptyBox />
        ) : (
          emailDATA.data.map((element, index) => (
            <div key={index} onClick={() => getMessages(element.id)}>
              <RecivedMail id={element.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;
