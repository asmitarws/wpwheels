import CountUp from "react-countup";
import Navbar from "./navbar";
import { API_URL_Custom } from "../config/config";
import { useEffect, useState } from "react";
import axios from "axios";

function Homepageheader() {
  const [homepageData, setHomepageData] = useState();
  const homepageURL = API_URL_Custom;
  useEffect(() => {
    axios
      .get(homepageURL + `/homepage`)
      .then((response) => {
        if (response.data) {
          setHomepageData(response.data);
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  },[]);
  return (
    <>
      {homepageData &&
        homepageData.map((data) => {
          return (
            <>
              <Navbar />
              <section className="site-banner-section">
                <div className="container">
                  <div className="row">
                    <div className="site-banner-section-left custom-col-6">
                      <header className="entry-header">
                        <h2
                          dangerouslySetInnerHTML={{
                            __html: data.headerBannerText,
                          }}
                          className="entry-title"
                        ></h2>
                      </header>
                    </div>
                    <div className="site-banner-section-right custom-col-6">
                      <figure>
                        <img
                          src={data.bannerRightImage.url}
                          className="wpwheels_slider_image"
                          alt="slider1"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </section>
              <section className="site-counter">
                <div className="container">
                  <div className="row">
                    <div className="counter-item-wrapper">
                      {data.counterGroup.map((counter) => (
                        <div className="counter-item">
                          <figure className="counter-icon">
                            <span className="ti ti-heart"></span>
                          </figure>
                          <div className="counter-detail">
                            <CountUp
                              className="counter-value"
                              end={counter.counterTitle}
                              duration={4}
                              suffix="k"
                            />
                            <div className="counter-text">
                              <h5
                                dangerouslySetInnerHTML={{
                                  __html: counter.counterText,
                                }}
                              ></h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        })}
    </>
  );
}

export default Homepageheader;
