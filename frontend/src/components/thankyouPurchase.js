import React, { useEffect } from 'react';
import '../css/thankyoupurchase.css';

const ThankYouPage = () => {
  useEffect(() => {
    // Optional: You can add additional logic or API calls here
  }, []);

  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1>Thank You!</h1>
        <p>Your purchase has been successful.</p>
        <div className="animation">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
