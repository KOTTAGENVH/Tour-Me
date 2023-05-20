//IT21013300
import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>About Us</h3>
            <p>Want to travel we are the choice!!!. Travel Mate is one of the best travel booking, destination booking, hotel booking and souvenier shopping everything under one roof.</p>
          </div>
          <div className="col">
            <h3>Contact Us</h3>
            <ul>
              <li>Address: 123 Main Street, City, Colombo</li>
              <li>Phone: +94 78435051</li>
              <li>Email: info@travelmate.com</li>
            </ul>
          </div>
          <div className="col">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="https://www.facebook.com/">Facebook</a></li>
              <li><a href="https://twitter.com/">Twitter</a></li>
              <li><a href="https://www.instagram.com/">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2023 Travel Mate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
