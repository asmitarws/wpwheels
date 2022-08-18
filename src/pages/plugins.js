import { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { NavLink } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { API_URL_Custom } from "../config/config";
import Footer from "../components/footer";

function Plugins() {
  const containerRef = useRef(null);
  const [plugins, setPlugins] = useState([]);
  const [page, setMyPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [postsPerPage] = useState(3);
  const [allPluginCount, setAllPluginCount] = useState();
  const [totalPluginPages, setTotalPluginPages] = useState();
  const setPage = (e, p) => {
    setMyPage(p);
  };
  /**
   * useEffect
   *
   */
  const baseURL = API_URL_Custom;

  useEffect(() => {
    loadAllPlugins();
    loadPluginsForEachPage();
    containerRef.current.focus();
  }, [page]);

  useEffect(() => {
    const totalPages = Math.ceil(allPluginCount / postsPerPage);
    setTotalPluginPages(totalPages);
  }, [plugins, allPluginCount]);

  const loadAllPlugins = () => {
    setLoading(true);
    axios
      .get(`${baseURL}/plugins`)
      .then((response) => {
        if (response.data) {
          const allPlugins = response.data.lists;
          setPlugins(allPlugins);
          setAllPluginCount(response.data.total.publish);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const loadPluginsForEachPage = () => {
    setLoading(true);
    const requestPostUrl = `${baseURL}/plugins/?page=${page}&posts_per_page=${postsPerPage}`;
    axios
      .get(requestPostUrl)
      .then((response) => {
        if (response.data) {
          const allPlugins = response.data.lists;
          setPlugins(allPlugins);
          console.log(allPlugins);
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
              <div className="container" ref={containerRef}>
                {!loading && (
                  <>
                    <div className="row">
                      {plugins.length < 1 && loading == true && (
                        <div className="wpwheels-loader"></div>
                      )}
                      {plugins.length > 0 && loading == false && (
                        <div className="wpwheels-plugins">
                          {plugins.length > 0 &&
                            plugins.map((plugin) => {
                              return (
                                <Card
                                  className="wpwheels-card"
                                  key={plugin.slug}
                                >
                                  <NavLink
                                    to={{
                                      pathname: `/plugins/${plugin.slug}`,
                                    }}
                                  >
                                    <img
                                      src={plugin.featured_image}
                                      alt="No Image"
                                    />

                                    <h3
                                      dangerouslySetInnerHTML={{
                                        __html: plugin.title,
                                      }}
                                    ></h3>
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
                        count={totalPluginPages}
                        page={page}
                        onChange={setPage}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Plugins;
