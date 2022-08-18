import { FSCheckout } from "freemius-checkout-js";
import { Link } from "react-router-dom";

const FreeVsPro = ({ theme }) => {
  const checkout = theme.meta_fields.theme_cpt_general_options;

  // instantiate
  const fsCheckout = new FSCheckout({
    plugin_id: checkout.productPluginId,
    public_key: checkout.productPublicKey,
  });

  return (
      <div className="tab-free-vs-pro" style={{ display: "block" }}>
        <div className="theme-tab-free-vs-pro-wrapper">
          <header className="entry-header">
            <h3
              className="entry-title"
              dangerouslySetInnerHTML={{
                __html:
                  theme &&
                  theme?.meta_fields?.theme_cpt_options?.fvpSectionTitle,
              }}
            ></h3>
          </header>
          <div className="theme-tab-free-vs-pro-content">
            <table>
              <tbody>
                <tr>
                  <th>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: theme && theme?.title,
                      }}
                    ></h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          theme &&
                          theme?.meta_fields?.theme_cpt_options
                            ?.fvpFreeShortDesc,
                      }}
                    ></p>
                  </th>
                  <th>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html:
                          theme &&
                          theme?.meta_fields?.theme_cpt_options?.fvpFreePrice,
                      }}
                    ></h3>
                    <div className="tab-free-vs-pro-descriprtion">
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            theme &&
                            theme?.meta_fields?.theme_cpt_options
                              ?.fvpFreeHighlightText,
                        }}
                      ></span>
                      <ul>
                        {theme &&
                          theme?.meta_fields?.theme_cpt_options?.fvpFreeInitialLists.map(
                            (fvpFreeInitialLists) => (
                              <div style={{ position: "relative" }}>
                                <i className="fa fa-check-circle"></i>
                                <li
                                  style={{
                                    textAlign: "left",
                                  }}
                                >
                                  {fvpFreeInitialLists?.fvpFreeInitialList}
                                </li>
                              </div>
                            )
                          )}
                      </ul>
                    </div>
                  </th>
                  <th>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html:
                          theme &&
                          theme?.meta_fields?.theme_cpt_options
                            ?.fvpPremiumPrice,
                      }}
                    ></h3>
                    <div className="tab-free-vs-pro-descriprtion">
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            theme &&
                            theme?.meta_fields?.theme_cpt_options
                              ?.fvpPremiumHighlightText,
                        }}
                      ></span>
                      <ul>
                        {theme &&
                          theme?.meta_fields?.theme_cpt_options?.fvpPremiumInitialLists.map(
                            (fvpPremiumInitialLists) => (
                              <div
                                style={{
                                  position: "relative",
                                }}
                              >
                                <i className="fa fa-check-circle"></i>

                                <li
                                  style={{
                                    textAlign: "left",
                                  }}
                                >
                                  {
                                    fvpPremiumInitialLists?.fvpPremiumInitialList
                                  }
                                </li>
                              </div>
                            )
                          )}
                      </ul>
                    </div>
                  </th>
                </tr>

                {theme &&
                  theme?.meta_fields?.theme_cpt_options?.fvpMainContentListRepeater.map(
                    (fvpMainContentListRepeater) => (
                      <tr>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="theme-tab-free-vs-pro-data-title">
                            <figure className="featured-image">
                              {theme?.meta_fields?.theme_cpt_options
                                ?.fvpMainContentListRepeater
                                ?.fvpIconImageSelect == 1 ? (
                                <i
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      fvpMainContentListRepeater?.fvpListIcon,
                                  }}
                                ></i>
                              ) : (
                                <img
                                  src={
                                    fvpMainContentListRepeater?.fvpListImage
                                      ?.thumbnail
                                  }
                                />
                              )}
                            </figure>
                            <div className="entry-content">
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html:
                                    fvpMainContentListRepeater?.fvpListTitle,
                                }}
                              ></h3>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html:
                                    fvpMainContentListRepeater?.fvpListDesc,
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                        {fvpMainContentListRepeater?.fvpPremiumNumberOnOffOption ==
                        1 ? (
                          <>
                            <td>
                              {fvpMainContentListRepeater?.fvpAvailableOnFree ==
                              1 ? (
                                <i className="fa fa-check-circle"></i>
                              ) : (
                                <i className="fa fa-times-circle"></i>
                              )}
                            </td>
                            <td>
                              {fvpMainContentListRepeater?.fvpAvailableOnPremium ==
                              1 ? (
                                <i className="fa fa-check-circle"></i>
                              ) : (
                                <i className="fa fa-times-circle"></i>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td
                              dangerouslySetInnerHTML={{
                                __html:
                                  fvpMainContentListRepeater?.fvpFreeOptionNumber,
                              }}
                            ></td>
                            <td
                              dangerouslySetInnerHTML={{
                                __html:
                                  fvpMainContentListRepeater?.fvpPremiumOptionNumber,
                              }}
                            ></td>
                          </>
                        )}
                      </tr>
                    )
                  )}
                <tr className="table-footer">
                  <td
                    dangerouslySetInnerHTML={{
                      __html: theme?.title,
                    }}
                  ></td>
                  <td>
                    <a
                      className="box-button"
                      href={
                        theme?.meta_fields?.theme_cpt_options?.fvpDownloadLink
                      }
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <Link
                      className="box-button purchase-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        fsCheckout.open({
                          plan_id: checkout.productBuyLinks,
                          licenses: 1,
                          billing_cycle: "annual",
                          success: (data) => {
                            console.log(data);
                          },
                        });
                      }}
                      to=""
                    >
                      BUY THEMES
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default FreeVsPro;
