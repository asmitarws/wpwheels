import React, { useState } from "react";
import Navbar from "./navbar";
import { useFsCheckout } from "../assets/js/checkout";

const PageDetailHeader = (props) => {
  const fsCheckout = useFsCheckout();

  const { pageDetails } = props;
  return (
    <>
      <Navbar />

      <section className="site-banner-section">
        <div className="container">
          {window.location.href.includes("/themes") && (
            <div
              className="theme-information-wrapper os-animation animated fadeInUp"
              data-os-animation="fadeInUp"
              data-os-animation-delay="0.7s"
              style={{ animationDelay: "0.7s" }}
            >
              {/* <div
                className="theme-information-content os-animation animated fadeInUp"
                data-os-animation="fadeInUp"
                data-os-animation-delay="0.7s"
                style={{ animationDelay: "0.7s" }}
              > */}
              <div className="theme-info">
                <div className="theme-price-tag">
                  <span className="theme-price">
                    {pageDetails?.meta_fields?.theme_cpt_general_options
                      ?.themePrice === "0"
                      ? "Free"
                      : "$" +
                        pageDetails?.meta_fields?.theme_cpt_general_options
                          ?.themePrice}
                  </span>
                </div>
                <header className="entry-header">
                  <h3
                    className="entry-title"
                    dangerouslySetInnerHTML={{
                      __html: pageDetails && pageDetails?.title,
                    }}
                  ></h3>
                </header>
                <div className="entry-meta">
                  <span className="wpwheels-category">
                    {pageDetails.category &&
                      pageDetails.category.map((singleCategory, index) => {
                        if (index + 1 < pageDetails.category.length) {
                          return (
                            <>
                              <a
                                className="cat-links"
                                href={`/wpthemes/${singleCategory.slug}`}
                                dangerouslySetInnerHTML={{
                                  __html: singleCategory.name,
                                }}
                              />
                              {","}{" "}
                            </>
                          );
                        } else {
                          return (
                            <a
                              href={`/wpthemes/${singleCategory.slug}`}
                              dangerouslySetInnerHTML={{
                                __html: singleCategory.name,
                              }}
                            />
                          );
                        }
                      })}
                  </span>
                </div>
                <div className="info-list-wrapper">
                  <div className="theme-info-listing">
                    <ul>
                      <li>
                        <span className="theme-info-listing-heading">
                          <i className="fa fa-check"></i>
                          Created Date:
                        </span>
                        <span className="theme-info-listing-content">
                          {
                            pageDetails?.meta_fields?.theme_cpt_general_options
                              ?.createdDate
                          }
                        </span>
                      </li>
                      <li>
                        <div className="theme-info-listing-heading">
                          <i className="fa fa-check"></i>
                          Current Version:
                        </div>
                        <div className="theme-info-listing-content">
                          {
                            pageDetails?.meta_fields?.theme_cpt_general_options
                              ?.currentVersion
                          }
                        </div>
                      </li>
                      <li>
                        <div className="theme-info-listing-heading">
                          <i className="fa fa-check"></i>
                          License:
                        </div>
                        <div className="theme-info-listing-content">
                          {
                            pageDetails?.meta_fields?.theme_cpt_general_options
                              ?.licenseType
                          }
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <span className="buy-now-button">
                    <a
                      className="box-button purchase-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        fsCheckout.open({
                          plan_id: {},
                          licenses: 1,
                          billing_cycle: "annual",
                          success: (data) => {
                            console.log(data);
                          },
                        });
                      }}
                      href=""
                    >
                      Buy Now
                      <span className="ti ti-arrow-right"></span>
                    </a>
                  </span>
                  <span className="demo-button">
                    <a
                      className=""
                      target="_blank"
                      href={
                        pageDetails?.meta_fields?.theme_cpt_general_options
                          ?.productDemoLinks
                      }
                    >
                      view Demo
                    </a>
                  </span>
                  <span className="documentation-btn">
                    <a
                      href={
                        pageDetails?.meta_fields?.theme_cpt_general_options
                          ?.productDocumentationLinks
                      }
                      target="_blank"
                    >
                      View Documentation
                      <span className="ti ti-arrow-right"></span>
                    </a>
                  </span>
                  <span className="theme-image-wrapper">
                    <figure className="theme-image">
                      <img src={pageDetails?.meta_fields?.theme_cpt_general_options?.productOtherImage?.thumbnail} alt="" />
                    </figure>
                  </span>
                </div>
              </div>
              {/* </div> */}
            </div>
          )}

          {window.location.href.includes("/blog") && (
            <div
              className="breadcumb-text"
              style={{
                backgroundImage: `url("${
                  Object.keys(pageDetails).length > 0
                    ? pageDetails.meta_fields.common_options
                        ?.staticHeaderBannerBgImage?.url
                    : ""
                }")`,
              }}
            >
              <h2
                dangerouslySetInnerHTML={{
                  __html:
                    Object.keys(pageDetails).length > 0
                      ? pageDetails.meta_fields?.common_options
                          ?.staticHeaderSubtitle
                      : "",
                }}
              ></h2>
              <h4
                dangerouslySetInnerHTML={{
                  __html:
                    Object.keys(pageDetails).length > 0
                      ? pageDetails.meta_fields?.common_options
                          ?.staticHeaderTitle
                      : "",
                }}
              ></h4>
            </div>
          )}

          {window.location.href.includes("/plugins") && (
            <div
              className="breadcumb-text"
              style={{
                backgroundImage: `url("${
                  Object.keys(pageDetails).length > 0
                    ? pageDetails.meta_fields.plugin_cpt_options?.soSectionImage
                        ?.url
                    : ""
                }")`,
              }}
            >
              <h2
                dangerouslySetInnerHTML={{
                  __html:
                    Object.keys(pageDetails).length > 0
                      ? pageDetails?.meta_fields?.plugin_cpt_options
                          ?.soSectionSubtitle
                      : "",
                }}
              ></h2>
              <h4
                dangerouslySetInnerHTML={{
                  __html:
                    Object.keys(pageDetails).length > 0
                      ? pageDetails.meta_fields.plugin_cpt_options
                          ?.soSectionTitle
                      : "",
                }}
              ></h4>
              {pageDetails.meta_fields?.plugin_cpt_options
                ?.soSectionButtonEnable == "1" ? (
                <a
                  href={
                    pageDetails.meta_fields?.plugin_cpt_options
                      ?.soSectionButtonUrl
                  }
                  target="_blank"
                >
                  <button>
                    {Object.keys(pageDetails).length > 0
                      ? pageDetails.meta_fields.plugin_cpt_options
                          ?.soSectionButtonLabel
                      : ""}
                  </button>
                </a>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PageDetailHeader;
