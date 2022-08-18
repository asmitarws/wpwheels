import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import coder from "../assets/images/coder.png";
import mail from "../assets/images/mail.png";
import subscribeImage from "../assets/images/subscribe_img1.png";
import { API_URL_Custom } from "../config/config";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [footerContent, setFooterContent] = useState();
  const baseURL = API_URL_Custom;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
  }, []);

  useEffect(() => {
    const footerUrl = `${baseURL}/footer/`;
    axios
      .get(footerUrl)
      .then((response) => {
        if (response.data) {
          setFooterContent(response.data);
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <footer className="site-footer">
        {footerContent &&
          footerContent.map((footerData) => (
            <>
              <div className="wpwheels-newsletter">
                <div className="container">
                  <div className="newsletter-wrap">
                    <div className="newsletter-content">
                      <header className="entry-header">
                        <h2
                          dangerouslySetInnerHTML={{
                            __html: footerData.newsletterHeader,
                          }}
                          className="entry-title subscription-text"
                        ></h2>
                      </header>
                      <div className="entry content">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: footerData.newsletterDescription,
                          }}
                        ></p>
                      </div>
                      <span className="subscribe-now">
                        <input
                          type="text"
                          placeholder="example@gmail.com"
                          className="wpwheels-input"
                          name="Email"
                          required=""
                        />
                        <button type="submit" className="wpwheels-button">
                          Subscribe Now
                          <i className="ti ti-arrow-right"></i>
                        </button>
                      </span>
                    </div>
                    <div className="newsletter-img">
                      <figure className="featured-img">
                        <img
                          src={footerData.newsletterImage.url}
                          alt="subscribe"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-footer">
                <div className="container">
                  <header className="entry-header">
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: footerData.joinUsHeader,
                      }}
                      className="entry-sub-title"
                    ></h3>
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: footerData.joinUsDescription,
                      }}
                      className="entry-title"
                    ></h2>
                  </header>
                  <div className="wpwheels-button">
                    <Link to="/" target="_self">
                      Get It Now<span className="ti ti-arrow-right"></span>
                    </Link>
                  </div>
                  <div className="site-support-wrap">
                    <div className="site-support">
                      <div className="site-support-content">
                        <header className="entry-header">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: footerData.userTitle,
                            }}
                            className="entry-sub-title"
                          ></h3>
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: footerData.userSubTitle,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        <div className="wpwheels-button">
                          <Link to="/" target="_self">
                            Request Now
                            <span className="ti ti-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                      <div className="site-support-img">
                        <figure className="featured-img">
                          <img src={footerData.userImage.url} alt="coder" />
                        </figure>
                      </div>
                    </div>
                    <div className="site-support">
                      <div className="site-support-content">
                        <header className="entry-header">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: footerData.serviceTitle,
                            }}
                            className="entry-sub-title"
                          ></h3>
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: footerData.serviceSubTitle,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        <div className="wpwheels-button">
                          <Link to="/" target="_self">
                            Request Now
                            <span className="ti ti-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                      <div className="site-support-img">
                        <figure className="featured-img">
                          <img src={footerData.serviceImage.url} alt="mail" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wpwheels-footer-bar">
                <div className="container">
                  <div className="btm-footer-wrap">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: footerData.copyright,
                      }}
                      className="copyright-section"
                    ></span>
                    <div className="wpwheels-icons">
                      {footerData.socialMediaLists.map((socialIcons) => (
                        <ul>
                          <li>
                            <a href={socialIcons.socialUrl}>
                              <img
                                src={socialIcons.socialIcon.thumbnail}
                                alt="social"
                                className="ti ti-social"
                              />
                            </a>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="back-to-top">
                  {isVisible && (
                    <button
                      title="Go to Top"
                      className="ti ti-angle-up"
                      onClick={scrollToTop}
                    ></button>
                  )}
                </div>
              </div>
            </>
          ))}
      </footer>
    </>
  );
}

export default Footer;
