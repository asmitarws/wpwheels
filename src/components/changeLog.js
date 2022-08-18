const ChangeLog = ({ theme }) => {

  return (
        <div className="theme-tab-change-wrapper">
          <header className="entry-header">
            <h3
              className="entry-title"
              dangerouslySetInnerHTML={{
                __html:
                  theme &&
                  theme?.meta_fields?.theme_cpt_options?.clSectionTitle,
              }}
            ></h3>
          </header>
          <div className="theme-tab-change-content">
              {
                theme?.meta_fields?.theme_cpt_options?.clListRepeater.length > 0 &&
                  theme?.meta_fields?.theme_cpt_options?.clListRepeater.map(
                      (clListRepeater) => (
                          <>
                        <h3
                        dangerouslySetInnerHTML={{
                            __html: clListRepeater.clListTitle
                        }}
                        ></h3>
                        <p
                        dangerouslySetInnerHTML={{
                            __html: clListRepeater.clListContent
                        }}
                        ></p>
                        </>
                      )
                  )
              }

          </div>
        </div>
  );
};

export default ChangeLog;
