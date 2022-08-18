const VideoTutorial = ({ theme }) => {

  return (
    <div className="theme-tab-tutorial-wrapper">
      <header className="entry-header">
        <h3
          className="entry-title"
          dangerouslySetInnerHTML={{
            __html:
              theme && theme?.meta_fields?.theme_cpt_options?.vtSectionTitle,
          }}
        ></h3>
      </header>
      <div className="theme-tab-tutorial-content">
        <div className="theme-tab-tutorial-item">
          <h3
            dangerouslySetInnerHTML={{
              __html:
                theme && theme?.meta_fields?.theme_cpt_options?.vtListTitle,
            }}
          ></h3>
          {/* <p
            dangerouslySetInnerHTML={{
              __html: theme?.meta_fields?.theme_cpt_options?.vtListContent,
            }}
          /> */}
          <iframe
            style={{
              width: "1080px",
              height: "515px",
            }}
            title="YouTube video player\"
            frameBorder="0"
            allow="accelerometer"
            autoPlay
            clipboard-write
            encrypted-media
            gyroscope
            picture-in-picture
            allowFullScreen
            srcDoc={theme?.meta_fields?.theme_cpt_options?.vtListContent}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoTutorial;
