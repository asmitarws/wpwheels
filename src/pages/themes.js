import { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { NavLink } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import scrollToTop from "../components/scrollToTop";
import { API_URL_Custom } from "../config/config";
import Footer from "../components/footer";

function Themes() {
  const containerRef = useRef(null);
  const [totalThemePages, setTotalThemePages] = useState();
  const [postsPerPage] = useState(4);
  const tabs = [1, 2, 3];
  const [themes, setThemes] = useState([]);
  const [freeThemes, setFreeThemes] = useState([]);
  const [premiumThemes, setPremiumThemes] = useState([]);
  const [page, setMyPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allThemesCount, setAllThemesCount] = useState();
  
  const setPage = (e, p) => {
    setMyPage(p);
  };

  const baseURL = API_URL_Custom;
  useEffect(() => {
    loadAllThemes();
    containerRef.current.focus();
  }, [page]);

  useEffect(() => {
    const totalPages = Math.ceil(allThemesCount / postsPerPage);
    setTotalThemePages(totalPages);
  }, [themes, allThemesCount]);

  useEffect(() => {
    setFreeThemes(
      themes.length
        ? themes.filter((theme) => {
            return (
              theme?.meta_fields?.theme_cpt_general_options?.themePrice == "0"
            );
          })
        : ""
    );
    setPremiumThemes(
      themes.length
        ? themes.filter((theme) => {
            return (
              theme?.meta_fields?.theme_cpt_general_options?.themePrice != "0"
            );
          })
        : ""
    );
  }, [themes]);

  const loadAllThemes = () => {
    setLoading(true);
    const requestPostUrl = `${baseURL}/themes/?page=${page}&posts_per_page=${postsPerPage}`;
    axios
      .get(requestPostUrl)
      .then((response) => {
        if (response.data) {
          const allThemes = response.data;
          setThemes(allThemes);
          setAllThemesCount(response.data.total);

        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Header />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <Tabs>
                <TabList>
                  <Tab>All</Tab>
                  <Tab>Free</Tab>
                  <Tab>Pro</Tab>
                </TabList>
                {tabs.map((i) => {
                  let list = [];
                  if (i == 1) list = themes;
                  else if (i == 2) list = freeThemes;
                  else list = premiumThemes;

                  return (
                    <TabPanel>
                      <div className="container" ref={containerRef}>
                        {!loading && (
                          <>
                            <div className="row">
                              {list.length < 1 && loading == true && (
                                <div className="wpwheels-loader"></div>
                              )}
                              {list.length > 0 && loading == false && (
                                <div className="wpwheels-themes">
                                  {list.length > 0 &&
                                    list.map((theme) => {
                                      return (
                                        <Card
                                          className="wpwheels-card"
                                          style={{ textAlign: "left" }}
                                          key={theme.slug}
                                        >
                                          <NavLink
                                            to={{
                                              pathname: `/themes/${theme.slug}`,
                                            }}
                                          >
                                            <img
                                              src={theme.featured_image}
                                              alt="No Image"
                                            />
                                            <span style={{ display: "flex" }}>
                                              <h3
                                                dangerouslySetInnerHTML={{
                                                  __html: theme.title,
                                                }}
                                              ></h3>
                                              {" - "}
                                              <h3>
                                                {theme?.meta_fields
                                                  ?.theme_cpt_general_options
                                                  ?.themePrice == "0"
                                                  ? " Free "
                                                  : "$" +
                                                    theme?.meta_fields
                                                      ?.theme_cpt_general_options
                                                      ?.themePrice}
                                              </h3>
                                            </span>
                                            {theme.category &&
                                              theme.category.map(
                                                (singleCategory, index) => {
                                                  if (
                                                    index + 1 <
                                                    theme.category.length
                                                  ) {
                                                    return (
                                                      <>
                                                        <span
                                                          dangerouslySetInnerHTML={{
                                                            __html:
                                                              singleCategory.name,
                                                          }}
                                                        />
                                                        {","}{" "}
                                                      </>
                                                    );
                                                  } else {
                                                    return (
                                                      <span
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            singleCategory.name,
                                                        }}
                                                      />
                                                    );
                                                  }
                                                }
                                              )}
                                          </NavLink>
                                        </Card>
                                      );
                                    })}
                                </div>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <Pagination
                                count={totalThemePages}
                                page={page}
                                onChange={setPage}
                                onUpdate={scrollToTop}
                              />
                            </div>
                          </>
                        )}
                        {loading && (
                          <>
                            <div style={{ minHeight: "50vh", padding: "20vh" }}>
                              <div className="wpwheels-loader"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </TabPanel>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Themes;
