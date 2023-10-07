import React from "react";

const AttachmentList = ({ attachments }) => {
  const handleFileClick = (attachment) => {
    // Extract the attachment's ID and related email's ID
    const attachmentID = attachment.id;
    const attachmentEmailID = attachment.email_id;

    // Check if it's an image
    if (attachment.content_type.startsWith("image/")) {
      window.open(
        `https://embedded.cryptogmail.com/api/emails/${attachmentEmailID}/attachments/${attachmentID}`,
        "_blank"
      );
    } else {
      // Handle non-image file clicks here
    }
  };

  return (
    <div className="files">
      {attachments.map((attachment, index) => {
        const isImage = attachment.content_type.startsWith("image/");
        const attachmentID = attachment.id;
        const attachmentEmailID = attachment.email_id;

        return (
          <div
            key={index}
            className="file-item"
            onClick={() => handleFileClick(attachment)}
          >
            {isImage ? (
              <img
                src={`https://embedded.cryptogmail.com/api/emails/${attachmentEmailID}/attachments/${attachmentID}`} // Fetch the attachment using the correct endpoint
                alt={attachment.file_name}
                width="20"
                height="20"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            )}
            <span>{attachment.file_name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AttachmentList;
