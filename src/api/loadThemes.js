import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { NavLink } from "react-router-dom";
import { API_URL_Custom } from "../config/config";

function LoadThemes() {
  const [themes, setThemes] = useState([]);
  const [page, setMyPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [themesPerPage, setThemesPerPage] = useState(4);
  const [postsPerPage] = useState(4);
  const setPage = (e, p) => {
    setMyPage(p);
  };
  /**
   * useEffect
   *
   */
  const baseURL = API_URL_Custom;

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = () => {
    setLoading(true);
    const requestPostUrl = `${baseURL}/themes/?page=${page}&posts_per_page=${postsPerPage}`;
    axios
      .get(requestPostUrl)
      .then((response) => {
        if (response.data) {
          const allThemes = response.data;
          setThemes(allThemes);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {!loading && (
        <>
          <div className="row">
            {themes.length < 1 && loading == true && (
              <div className="wpwheels-loader"></div>
            )}
            {themes.length > 0 && loading == false && (
              <div className="wpwheels-themes wpwheels-themes-homepage">
                {themes.length > 0 &&
                  themes.map((theme) => {
                    return (
                      <Card className="wpwheels-card" key={theme.slug}>
                        <NavLink
                          to={{
                            pathname: `/themes/${theme.slug}`,
                          }}
                        >
                          <img src={theme.featured_image} alt="No Image" />
                          <p>
                            {theme?.meta_fields?.theme_cpt_general_options
                              ?.themePrice === "0"
                              ? "Free"
                              : "$" +
                                theme?.meta_fields?.theme_cpt_general_options
                                  ?.themePrice}
                          </p>
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: theme.title,
                            }}
                          ></h3>
                          {theme.category &&
                            theme.category.map((singleCategory, index) => {
                              if (index + 1 < theme.category.length) {
                                return (
                                  <>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: singleCategory.name,
                                      }}
                                    />
                                    {","}{" "}
                                  </>
                                );
                              } else {
                                return (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: singleCategory.name,
                                    }}
                                  />
                                );
                              }
                            })}
                        </NavLink>
                      </Card>
                    );
                  })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
export default LoadThemes;
