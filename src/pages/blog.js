import Card from "@material-ui/core/Card";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/header";
import scrollToTop from "../components/scrollToTop";
import { API_URL_Custom } from "../config/config";
import Footer from "../components/footer";
import BlogDetail from "./blogDetail";

export default function Blog() {
  const containerRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [allPostCount, setAllPostCount] = useState();
  const [totalBlogPages, setTotalBlogPages] = useState();
  const [page, setMyPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState();

  const setPage = (e, p) => {
    // e.preventdefault();
    setMyPage(p);
  };
  /**
   * useEffect
   *
   */
  const baseURL = API_URL_Custom;

  useEffect(() => {
    loadAllPosts();
    loadPostsForEachPage();
    containerRef.current.focus();
  }, [page]);

  useEffect(() => {
    const totalPages = Math.ceil(allPostCount / postsPerPage);
    setTotalBlogPages(totalPages);
  }, [posts, allPostCount]);

  const loadAllPosts = () => {
    setLoading(true);
    axios
      .get(`${baseURL}/posts`)
      .then((response) => {
        if (response.data) {
          const allPosts = response.data.blogs;
          setPosts(allPosts);
          setAllPostCount(response.data.total.publish);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const loadPostsForEachPage = () => {
    setLoading(true);
    const requestPostUrl = `${baseURL}/posts/?page=${page}&posts_per_page=${postsPerPage}`;
    axios
      .get(requestPostUrl)
      .then((response) => {
        if (response.data) {
          const allPosts = response.data.blogs;
          setPosts(allPosts);
          setPosts(allPosts);
        } else {
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (e) => {
    setSelectedPost(e)
  }

  return (
    <>
      <Header />
      <div id="page" className="hfeed-site">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <div id="main" className="site-main">
              {/* ref here on every page change  */}
              <div className="container" ref={containerRef}>
                {!loading && (
                  <>
                    <div className="row">
                      {posts.length < 1 && loading == true && (
                        <div className="wpwheels-loader"></div>
                      )}
                      {posts.length > 0 && loading == false && (
                        <div className="wpwheels-blogs wpwheels-blogs-detail">
                          {posts.length > 0 &&
                            posts.map((post) => {
                              return (
                                <>
                                  <li key={post.slug}
                                    onClick={() => handleClick(post)}
                                  >
                                    {
                                      selectedPost && selectedPost.slug === post.slug ? (
                                        <BlogDetail post={post} />
                                      ) : (
                                        <>
                                          <img
                                            src={post.featured_image}
                                            alt="No Image"
                                          />
                                          <h3
                                            dangerouslySetInnerHTML={{
                                              __html: post.title,
                                            }}
                                          ></h3>
                                        </>)
                                    }
                                  </li>
                                </>

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
                        count={totalBlogPages}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
