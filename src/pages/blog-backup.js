import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import Pagination from "react-mui-pagination";
import Card from "@material-ui/core/Card";
import { NavLink } from "react-router-dom";
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [page, setMyPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const [loading, setLoading] = useState(true);
  const setpage = (e, p) => {
    setMyPage(p);
  };
  /**
   * useEffect
   *
   */
  const baseURL = "https://aarambhathemes.com/wp-json/wp/v2";

  useEffect(() => {
    loadPosts();

  }, [page]);

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(baseURL + "/posts/?_embed=true&page=" + page + "&per_page=" + postsPerPage)
      .then((response) => {

        if (response.data) {
          const allPosts = response.data;
          setPosts(allPosts);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }
  const handlePostPerPageBlur = (e) => {
    setPostsPerPage(e.target.value)
    loadPosts();
  }
  return (
    <>
      <div id="page" className="hfeed-site">
        <Header></Header>
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
        
        {/* ref here on every page change  */}
        <div className="container">

                {!loading && <>
                  <div className="row">
                    {posts.length < 1 && loading == true && (
                      <div className="wpwheels-loader"></div>
                    )}
                    {posts.length > 0 && loading == false && (
                      <div className="wpwheels-blogs">
                        {posts.length > 0 &&
                          posts.map((post) => {
                            return (
                              <Card className="wpwheels-card" key={post.id}>
                                <NavLink to={{
                                  pathname: `/blog/${post.id}`,
                                  state: { title: 'from home page' },

                                }}>
                                  <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url} alt="No Image" />
                                  <h3 dangerouslySetInnerHTML={{
                                    __html: post.title.rendered
                                  }}>
                                    {/* {post.title.rendered} */}
                                  </h3>
                                </NavLink>
                              </Card>
                            );
                          })}

                      </div>
                    )}

                  </div>
                 
                 {/* do css or import mui component here */}
                  <div style={{ display: "flex", flexDirection: "row", width: "100%", verticalAlign:"middle"}}>
                    <label>Items Per Page</label>
                    <input type="number" value={postsPerPage} onChange={(e)=>{setPostsPerPage(e.target.value)}} onBlur={handlePostPerPageBlur} />
                    <Pagination hideFirstLast page={page ||9} setpage={setpage} total={30} />
                  </div>
                </>}
                {loading && <>
                  <div style={{minHeight:"50vh",padding:"20vh" }}>
                  <div className="wpwheels-loader">
                    </div>
                  
                  </div>
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}