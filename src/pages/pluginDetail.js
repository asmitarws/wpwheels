import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { API_URL_Custom } from "../config/config";
import PageDetailHeader from "../components/pageDetailHeader";
import Footer from "../components/footer";

const PluginDetail = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [plugin, setPlugin] = useState([]);
  const baseURL = API_URL_Custom;

  useEffect(() => {
    setLoading(true);
    const queryURL = baseURL + `/plugins/${id}`;
    axios
      .get(queryURL)

      .then((response) => {
        if (response.data) {
          const Plugin = response.data;
          setPlugin(Plugin);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [plugin]);
  return (
    <>
      <PageDetailHeader pageDetails={plugin} />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <div className="container">
                {loading && (
                  <>
                    <div className="row">
                      <div className="wpwheels-plugins">
                        <Card className="wpwheels-card">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: plugin && plugin?.title,
                            }}
                          ></h3>
                          {plugin && (
                            <img
                              src={plugin && plugin?.featured_image}
                              alt="No Image"
                            />
                          )}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: plugin?.content,
                            }}
                          ></p>
                        </Card>
                      </div>
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
};

export default PluginDetail;
