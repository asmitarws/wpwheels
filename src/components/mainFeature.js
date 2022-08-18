const MainFeature = ({ theme }) => {
  return (
    <div className="theme-tab-feature-wrapper">
      {theme &&
        (theme?.meta_fields?.theme_cpt_options?.mfSectionEnable == 1 ? (
          <div className="theme-main-feature-wrapper">
            <header className="entry-header">
              <h3 className="entry-title">
                {Object.keys(theme).length > 0
                  ? theme.meta_fields.theme_cpt_options?.mfSectionTitle
                  : ""}
              </h3>
            </header>


            <div className="theme-main-feature-post-wrapper features-list">
              {theme?.meta_fields?.theme_cpt_options?.mfItemsRepeater?.map(
                (mfItemsRepeater) => {
                  return (
                    <div className="wpwheels-feature-post post os-animation animated fadeInUp" data-os-animation="fadeInUp"
                      data-os-animation-delay="0.4s"
                      style={{ animationDelay: "0.4s" }}>
                      {mfItemsRepeater?.mfIconImageSelect == "1" ? (
                        <figure className="featured-image">
                          <img
                            src={mfItemsRepeater?.mfListImage?.url}
                            className="wpwheels-features"
                            alt=""
                          />
                        </figure>
                      ) : (
                        <></>
                      )}
                      <header className="post-content-wrap">
                        <h3
                          className="entry-title"
                          dangerouslySetInnerHTML={{
                            __html: mfItemsRepeater.mfListTitle,
                          }}
                        ></h3>
                      </header>
                      <p
                        className="entry-content"
                        dangerouslySetInnerHTML={{
                          __html: mfItemsRepeater.mfListDesc,
                        }}
                      ></p>
                    </div>
                  );
                })}
            </div>


          </div>
        ) : (
          <></>
        ))}
      <div className="theme-other-feature-wrapper">
        <header className="entry-header">
          <h3
            className="entry-title"
            dangerouslySetInnerHTML={{
              __html:
                theme?.meta_fields?.theme_cpt_options?.mfOtherSectionTitle,
            }}
          ></h3>
        </header>
        <div className="theme-other-feature-listing">
          <ul
            style={{
              display: "flex",
              textAlign: "left",
              padding: "0",
            }}
          >
            {theme?.meta_fields?.theme_cpt_options?.mfOtherFeaturesListRepeater.length > 0 && theme?.meta_fields?.theme_cpt_options?.mfOtherFeaturesListRepeater.map(
              (mfOtherFeaturesList) => (
                <span className="other-feature-listicon-wrapper">
                  <i className="fa fa-check-circle"></i>
                  <li
                    style={{ marginLeft: "40px", display: "flex" }}
                    dangerouslySetInnerHTML={{
                      __html: mfOtherFeaturesList.mfOtherListTitle,
                    }}
                  />
                </span>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;
