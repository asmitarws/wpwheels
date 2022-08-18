import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { API_URL_Custom } from "../config/config";
import PageDetailHeader from "../components/pageDetailHeader";
import Footer from "../components/footer";
import Comments from "../components/comments";
// import {Helmet} from "react-helmet";

const BlogDetail = (props) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const baseURL = API_URL_Custom;

  useEffect(() => {
    setLoading(true);
    const queryURL = baseURL + `/posts/${slug}`;
    axios
      .get(queryURL)
      .then((response) => {
        if (response.data) {
          const Post = response.data;
          setPost(Post);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [post]);
  return (
    <>
      <PageDetailHeader pageDetails={post} />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              <div className="container">
                {loading && (
                  <>
                    <div className="row">
                      <div className="wpwheels-blogs">
                        <Card className="wpwheels-card">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: post && post?.title,
                            }}
                          ></h3>
                          {post && (
                            <img
                              src={post && post?.featured_image}
                              alt="No Image"
                            />
                          )}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post?.content,
                            }}
                          ></p>

                          {/* <Helmet>
                          <script>
                          {post?.shortcode}
                          </script>
                          <script>
                          {
                            console.log('Test')
                          }
                        </script>
                        </Helmet> */}

                          {/* <span
                              dangerouslySetInnerHTML={{
                                __html: post.category?.[0]?.name,
                              }}
                            /> */}
                        </Card>
                        <Comments post={post} />
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

export default BlogDetail;
