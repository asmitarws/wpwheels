const Overview = ({ theme }) => {
  return (
    <div className="theme-overview-wrapper">
      <header className="entry-header">
        <h3
          className="entry-title"
          dangerouslySetInnerHTML={{
            __html: theme && theme?.title,
          }}
        ></h3>
      </header>
      <figure
        className="featured-image"
        style={{ 
          // textAlign: "left",
           marginLeft: "0" 
          }}
      >
        {theme && (
          <img
            className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
            src={theme && theme?.featured_image}
            alt="No Image"
          />
        )}
      </figure>
      <span
        className="entry-content"
        dangerouslySetInnerHTML={{
          __html: theme && theme?.excerpt,
        }}
      ></span>
    </div>
  );
};

export default Overview;
