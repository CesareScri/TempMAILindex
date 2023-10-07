import React, { useState, useEffect } from "react";
import TimeDisplay from "./TimeDisplay";
import AttachmentList from "./AttachmentList";

const ShowEmailBody = ({ id }) => {
  const [emailData, setEmailData] = useState({});
  const [emailBody, setEmailBody] = useState("");

  const getBodyID = async () => {
    try {
      const request = await fetch(`http://localhost:4000/api/user=${id}`);
      const response = await request.json();
      setEmailData(response.data.data);
      //   console.log(emailData);
    } catch (error) {
      console.log(error);
    }
  };

  const getText = async () => {
    try {
      const request = await fetch(`http://localhost:4000/api/body=${id}`);
      const response = await request.json();
      setEmailBody(response.data);
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBodyID();
    getText();
  }, [id]);

  return (
    <div className="body-email">
      <div className="top-body">
        <div className="first-email-div">
          <div className="circle-profile">
            {emailData.sender && emailData.sender.display_name.charAt(0)}
          </div>
          <div className="sender-info">
            <p>{emailData.sender ? emailData.sender.display_name : ""}</p>
            <h4>{emailData.sender ? emailData.sender.email : ""}</h4>
          </div>
        </div>
        <TimeDisplay dateString={emailData.created_at} />
      </div>
      <div className="second-body">
        <div className="linea"></div>
        <h5>
          Subject:{" "}
          <strong>
            {emailData.subject === "" ? "empty" : emailData.subject}
          </strong>
        </h5>
        <div className="linea"></div>
      </div>
      {emailData.attachments && emailData.attachments.length > 0 ? (
        <AttachmentList attachments={emailData.attachments} />
      ) : null}
      <div
        className="email-content"
        dangerouslySetInnerHTML={{ __html: emailBody }}
      ></div>
    </div>
  );
};

export default ShowEmailBody;
