import React from "react";
import Navbar from "./navbar";
function Header() {
  return (
    <>
      <Navbar />

      <section className="site-banner-section">
        <div className="container">
          {window.location.href.includes("/themes") && (
            <div className="breadcumb-text">
              <h2>Awesome WordPress Themes</h2>
              <h4>Create Your Business Websites Quicker And Professional</h4>
            </div>
          )}
          {window.location.href.includes("/plugins") && (
            <div className="breadcumb-text">
              <h2>Powerful WordPress Plugins</h2>
              <h4>Get Additional Compelling Features</h4>
            </div>
          )}
          {window.location.href.includes("/pricing") && (
            <div className="breadcumb-text">
              <h2>All Themes Plan Package</h2>
              <h4>Choose a Plan That's Right for You</h4>
            </div>
          )}
          {window.location.href.includes("/blog") && (
            <div className="breadcumb-text">
              <h2>Our Blog Articles</h2>
              <h4>Keep you up to date with WordPress</h4>
            </div>
          )}
          {window.location.href.includes("/support") && (
            <div className="breadcumb-text">
              <h2>Support Ticket</h2>
              <h4>
                Have questions or need help with one of our themes? We're here
                to help!
              </h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Header;
