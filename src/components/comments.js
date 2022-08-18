import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import WpComments from "react-wordpress-comments";
import "react-wordpress-comments/css/styles.css";
import { API_URL } from "../config/config";
import axios from "axios";

const Comments = ({ post }) => {
  const [user, setUser] = useState();
  const url = API_URL;

  useEffect(() => {
    const userUrl = url + "/users";
    axios
      .get(userUrl)
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {user &&
        user.map((value) => {
          // console.log(value.name);
          // console.log(post.id);
          return (
            <WpComments
              maxDepth={3} // provide depth that you want comments to be nested in a list
              pageId={post.id} // id of a page you want to fetch comments from and post to
              hostUrl="https://api.wpwheels.com" // url of your WordPress website
              allowComments={true} // can users post comments?
              user={value} // provide user if authorized, default is null. See below
            />
          );
        })}
    </>
    // <div>
    //   <form className="wpwheels-form">
    //     <input
    //       type="hidden"
    //       id="postId"
    //       // value={POST_ID}
    //     />
    //     <div className="wpwheels-comment-text">
    //       <h2>Leave a Reply</h2>
    //       <h4>
    //         <span>
    //           Logged in as wpwheels.
    //           <a href="">Log out?</a>{" "}
    //         </span>
    //         Required fields are marked *
    //       </h4>
    //     </div>
    //     <div className="wpwheels-comment">
    //       <label htmlFor="comment">Comment *</label>
    //       <textarea id="comment" required cols={45} rows={8} />
    //     </div>
    //     <div className="wpwheels-button">
    //       <Link to="/" target="_self">
    //         Post Comment
    //         <span className="ti ti-arrow-right"></span>
    //       </Link>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Comments;
