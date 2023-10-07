import React, { useEffect, useState } from "react";

const RecivedMail = ({ id }) => {
  const [datas, setDatas] = useState({});

  const getBodyID = async () => {
    try {
      const request = await fetch(`http://localhost:4000/api/user=${id}`);
      const response = await request.json();
      setDatas(response.data.data);
      // console.log(datas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBodyID();
  }, [id]);

  return (
    <div className="recived-mail">
      <div className="user-profile">
        <div className="circle-profile">
          {datas.sender && datas.sender.display_name.charAt(0)}
        </div>
        <div className="sender-info">
          <p>{datas.sender ? datas.sender.display_name : "Loading..."}</p>
          <h4>{datas.sender ? datas.sender.email : "Loading..."}</h4>
        </div>
      </div>
      <p className="subject-p">
        {datas.subject === "" ? "empty" : datas.subject || "Loading..."}
      </p>
      <div className="icon-right">
        {datas.attachments && datas.attachments.length === 0 ? null : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-paperclip"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  );
};

export default RecivedMail;
