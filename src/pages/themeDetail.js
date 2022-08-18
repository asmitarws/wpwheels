import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL_Custom } from "../config/config";
import PageDetailHeader from "../components/pageDetailHeader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Overview from "../components/overview";
import MainFeature from "../components/mainFeature";
import FreeVsPro from "../components/freeVsPro";
import ChangeLog from "../components/changeLog";
import VideoTutorial from "../components/videoTutorial";
import Footer from "../components/footer";

const ThemeDetail = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState([]);
  const baseURL = API_URL_Custom;
  useEffect(() => {
    setLoading(true);
    const queryURL = baseURL + `/themes/${id}`;
    axios
      .get(queryURL)
      .then((response) => {
        setTheme(response?.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <PageDetailHeader pageDetails={theme} />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <div className="container">
                {loading == false && Object.keys(theme).length > 0 && (
                  <div className="row">
                    <div className="wpwheels-themes wpwheels-themes-detail">
                      <section className="theme-tab-section">
                        <div className="container">
                          <div className="theme-tab-wrapper">
                            <Tabs
                              defaultIndex={0}
                              onSelect={(index) => console.log(index)}
                            >
                              <TabList>
                                <Tab>Overview</Tab>
                                <Tab>Main Feature</Tab>
                                {theme.meta_fields.theme_cpt_options
                                  .fvpSectionEnable == 1 ? (
                                  <Tab>Free VS Pro</Tab>
                                ) : (
                                  ""
                                )}
                                <Tab>Change Log</Tab>
                                <Tab>Video Tutorial</Tab>
                              </TabList>
                              <TabPanel className="tab-content os-animation animated fadeInUp">
                                <Overview theme={theme} />
                              </TabPanel>
                              <TabPanel className="tab-content os-animation animated fadeInUp">
                                <MainFeature theme={theme} />
                              </TabPanel>
                              {theme.meta_fields.theme_cpt_options
                                .fvpSectionEnable == 1 ? (
                                <TabPanel className="tab-content os-animation animated fadeInUp">
                                  <FreeVsPro theme={theme} />
                                </TabPanel>
                              ) : (
                                ""
                              )}
                              <TabPanel className="tab-content os-animation animated fadeInUp">
                                <ChangeLog theme={theme} />
                              </TabPanel>
                              <TabPanel className="tab-content os-animation animated fadeInUp">
                                <VideoTutorial theme={theme} />
                              </TabPanel>
                            </Tabs>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThemeDetail;
