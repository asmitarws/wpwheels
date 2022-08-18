import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Homepageheader from "../components/homepageHeader";
import { Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadBlogs from "../api/loadBlogs";
import LoadThemes from "../api/loadThemes";
import Footer from "../components/footer";
import { API_URL_Custom } from "../config/config";
import { useEffect, useState } from "react";
import axios from "axios";

function Homepage() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoPlay: true,
  };
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
  });

  return (
    <>
      <Homepageheader />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            {homepageData &&
              homepageData.map((data) => {
                return (
                  <div id="main" className="site-main">
                    <section className="site-template">
                      <div className="container">
                        <div className="wpwheels-card-wrapper">
                          <header className="entry-header">
                            <h2
                              dangerouslySetInnerHTML={{
                                __html: data.hpThemePluginHeader,
                              }}
                              className="entry-title top-field"
                            ></h2>
                          </header>
                          <LoadThemes />
                          <Link
                            to="/themes"
                            className="wpwheels-button btn-center"
                          >
                            Load More
                            <i className="ti ti-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </section>
                    <section className="wpwheels-features">
                      <div className="container">
                        <header className="entry-header">
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: data.hpKeyFeaturesHeader,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        <div className="features-list">
                          {data.keyFeaturesGroup.map((keyFeature) => {
                            return (
                              <div className="wpwheels-feature-post">
                                <img
                                  src={keyFeature.featureImage.thumbnail}
                                  className="wpwheels-features"
                                  alt=""
                                />
                                <header className="entry-header">
                                  <h3
                                    className="entry-title"
                                    dangerouslySetInnerHTML={{
                                      __html: keyFeature.featureHeader,
                                    }}
                                  ></h3>
                                </header>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: keyFeature.featureContent,
                                  }}
                                ></p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                    <section className="wpwheels-tools">
                      <div className="container">
                        <header className="entry-header">
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: data.hpFavoriteToolsHeader,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        <div className="grid-image">
                          <figure className="center-image">
                            <img
                              src={data.hpCenterImage.url}
                              className="feature-tools"
                              alt=""
                            />
                          </figure>
                          <div className="gridimage-left">
                            {data.gridImageLeftGroup.map(
                              (leftImageGroup, index) => {
                                if (index == 0) {
                                  var a = "gridimage-left-1 wooCommerce";
                                } else if (index == 1) {
                                  var a = "gridimage-left-1 gutenberg";
                                } else if (index == 2) {
                                  var a = "gridimage-left-2 contactForm";
                                } else if (index == 3) {
                                  var a = "gridimage-left-2 jetpack";
                                }
                                return (
                                  <div className={a}>
                                    <img
                                      src={
                                        leftImageGroup.gridLeftImage.thumbnail
                                      }
                                      alt="grid left image"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>

                          <div className="gridimage-right">
                            {data.gridImageRightGroup.map(
                              (rightImageGroup, index) => {
                                if (index == 0) {
                                  var a = "gridimage-right-1 elementor";
                                } else if (index == 1) {
                                  var a = "gridimage-right-1 yoast";
                                } else if (index == 2) {
                                  var a = "gridimage-right-2 mailchimp";
                                } else if (index == 3) {
                                  var a = "gridimage-right-2 wpml";
                                }
                                return (
                                  <div className={a}>
                                    <img
                                      src={
                                        rightImageGroup.gridRightImage.thumbnail
                                      }
                                      alt="grid right image"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <section className="wpwheels-clients-reviews">
                        <div className="container">
                          <header className="entry-header">
                            <h2
                              dangerouslySetInnerHTML={{
                                __html: data.hpClientReviewsHeader,
                              }}
                              className="entry-title"
                            ></h2>
                          </header>

                          <Slider {...settings} className="category-slider">
                            {data.clientReviewsGroup.map((reviewSection) => (
                              <div className="reviews-section">
                                <Card>
                                  <CardHeader
                                    avatar={
                                      <Avatar
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          padding: 1,
                                        }}
                                        src={
                                          reviewSection.clientAvatar.thumbnail
                                        }
                                        className="card-icon"
                                      />
                                    }
                                    title={reviewSection.reviewTitle}
                                    subheader={reviewSection.reviewSubTitle}
                                  />
                                  <CardContent>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      dangerouslySetInnerHTML={{
                                        __html: reviewSection.reviewMessage,
                                      }}
                                    ></Typography>
                                  </CardContent>
                                  <CardActions disableSpacing>
                                    <IconButton
                                      aria-label="ratings"
                                      className={`star-ratings review-ratings-${reviewSection.reviewStars}`}
                                    >
                                      <div className="star-ratings-top">
                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>
                                      </div>
                                      <div className="star-ratings-bottom">
                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>

                                        <span>★</span>
                                      </div>
                                    </IconButton>
                                    <CardContent>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        className="review-count"
                                        dangerouslySetInnerHTML={{
                                          __html: reviewSection.totalReviews,
                                        }}
                                      ></Typography>
                                    </CardContent>
                                  </CardActions>
                                </Card>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </section>
                    </section>
                    <section className="wpwheels-mission">
                      <img
                        className="mission-img"
                        src={data.hpSideImage.url}
                        alt="man-on-laptop"
                      />
                      <div className="mission-text-header">
                        <header className="entry-header">
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: data.hpOurMissionsHeader,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        {data.missionServicesGroup.map((missionService) => (
                          <div className="mission-services animate__animated animate__zoomIn">
                            <figure className="icon-image">
                              <img
                                src={missionService.missionImage.thumbnail}
                                alt="template-icon"
                              />
                            </figure>
                            <span className="mission-text">
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: missionService.missionText,
                                }}
                              ></h3>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: missionService.missionDescription,
                                }}
                                className="wpwheels-description"
                              ></p>
                            </span>
                          </div>
                        ))}
                        <div className="wpwheels-button">
                          <Link to="/" target="_self">
                            Get Support
                            <span className="ti ti-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </section>
                    <section className="wpwheels-blogs">
                      <div className="container">
                        <header className="entry-header">
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: data.hpBlogsHeader,
                            }}
                            className="entry-title"
                          ></h2>
                        </header>
                        <LoadBlogs />
                        <Link to="/blog" className="wpwheels-button btn-center">
                          View More
                          <i className="ti ti-arrow-right"></i>
                        </Link>
                      </div>
                    </section>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
