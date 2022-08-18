import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import { NavLink } from "react-router-dom";
import { API_URL_Custom } from "../config/config";

function LoadBlogs() {
  const [posts, setPosts] = useState([]);
  const [page, setMyPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [postsPerPage] = useState(3);
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
    const requestPostUrl = `${baseURL}/posts/?page=${page}&posts_per_page=${postsPerPage}`;
    axios
      .get(requestPostUrl)
      .then((response) => {
        if (response.data) {
          const allPosts = response.data.blogs;
          setPosts(allPosts);
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
        <div className="row">
          <div className="container">
            {posts.length < 1 && loading == true && (
              <div className="wpwheels-loader"></div>
            )}
            {posts.length > 0 && loading == false && (
              <div className="wpwheels-blogs wpwheels-blogs-homepage">
                {posts.length > 0 &&
                  posts.map((post) => {
                    return (
                      <Card className="wpwheels-card" key={post.slug}>
                        <NavLink
                          to={{
                            pathname: `/blog/${post.slug}`,
                            state: { title: "from home page" },
                          }}
                        >
                          <img src={post.featured_image} alt="No Image" />
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: post.title,
                            }}
                          ></h3>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: post.published_date,
                            }}
                          ></span>
                          {" - "}
                          {post.category &&
                            post.category.map((singleCategory, index) => {
                              if (index + 1 < post.category.length) {
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
        </div>
      )}
    </>
  );
}

export default LoadBlogs;
