import React, { useState, useEffect } from "react";
import "./AdsModal.scss";

const AdsModal = ({ onClose }) => {
  // State to track whether the modal is open
  const [isOpen, setIsOpen] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    if (countdown === 0) {
      setIsOpen(false);
      onClose();
    }
    return () => {
      clearInterval(timeoutId);
    };
  }, [countdown, onClose]);

  if (!isOpen) {
    return null; // Do not render the modal if it's closed
  }

  //   useEffect(() => {}, []);
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <div className="ad-modal">
      {/* Add your ad content and styles here */}
      <div className="countdown-circle">
        <div
          className="progress"
          style={{ animationDuration: `${countdown}s` }}
        ></div>
        <div className="countdown-text">{countdown}</div>
      </div>
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
      <img
        src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Hero_Powerpoint_960x675_2x_RE4qOAK?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=3840&qlt=100&fmt=png-alpha&fit=constrain"
        alt="Ad"
      />
    </div>
  );
};

export default AdsModal;
