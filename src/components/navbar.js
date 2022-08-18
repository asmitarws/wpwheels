import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import styles from "../assets/js/customInputStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL_Custom, API_Search_URL } from "../config/config";
import Login from "../SignIn/login.js";
// import FS from "https://users.freemius.com/dashboard.js"
// import Dashboard from "../Dashboard/dashboard.jsx";
// import FS from '../assets/js/dashboard'

library.add(fas, faFontAwesome);
const useStyles = makeStyles(styles);
const Navbar = (props) => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
  } = props;
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  const apiData = API_URL_Custom;
  const [siteLogo, setSiteLogo] = useState();
  const [themes, setThemes] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getLogo = apiData + `/logo/`;
    axios
      .get(getLogo)
      .then((response) => {
        if (response?.data) {
          setSiteLogo(response?.data);
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const themeData = apiData + `/themes/`;
    axios
      .get(themeData)
      .then((response) => {
        if (response?.data) {
          setThemes(response?.data);
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  //search result suggestions
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
    console.log(text, "$text");
  };

  //search form onchange
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = themes.filter((theme) => {
        const regex = new RegExp(`${text}`, "gi");
        return theme.title.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  };

  //search form action
  const submitRequest = () => {
    // for live site
    // const searchURL = API_Search_URL;

    // for local site
    const searchURL = `http://localhost:3000/themes`;

    themes.map((theme) => {
      const url = searchURL + `/${theme.slug}`;
      window.open(url, "_blank");
    });
  };

  return (
    <>
      <header id="header" className="site-header">
        <section className="hgroup-wrap">
          <div className="container">
            <div className="row">
              <div className="site-title">
                <Link to="/" target="_self">
                  <img src={siteLogo} alt="logo" className="wpwheels-logo" />
                </Link>
              </div>
              <div className="hgroup-right">
                <div id="navbar" className="navbar">
                  <nav className="main-navigation">
                    <ul className="wpwheels-menus">
                      <li
                        className={
                          window.location.href.includes("/themes") ||
                            window.location.href.includes("/plugins") ||
                            window.location.href.includes("/pricing") ||
                            window.location.href.includes("/blog") ||
                            window.location.href.includes("/support") ||
                            window.location.href.includes("/forum")
                            ? ""
                            : "current-menu-item"
                        }
                      >
                        <Link to="/" className="wpwheels-menus-item">
                          Home
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/themes")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/themes" className="wpwheels-menus-item">
                          Themes
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/plugins")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/plugins" className="wpwheels-menus-item">
                          Plugins
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/pricing")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/pricing" className="wpwheels-menus-item">
                          Pricing & Plan
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/blog")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/blog" className="wpwheels-menus-item">
                          Blog
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/support")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/support" className="wpwheels-menus-item">
                          Support
                        </Link>
                      </li>
                      <li
                        className={
                          window.location.href.includes("/forum")
                            ? "current-menu-item"
                            : ""
                        }
                      >
                        <Link to="/forum" className="wpwheels-menus-item">
                          Forum
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="right-menu">
                  <div
                    className={
                      searchActive ? "search-btn search-active" : "search-btn"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchActive(!searchActive);
                    }}
                  // {(e) => {
                  //   e.preventDefault();
                  //   document
                  //     .querySelector(".search-section")
                  //     .classList.toggle("search-active");
                  // }}
                  ></div>
                  {themes &&
                    themes.map((data) => (
                      <>
                        <div
                          className="search-section"
                        // key={data.slug}
                        >
                          <form
                            role="search"
                            method="get"
                            className="search-form"
                            action={submitRequest}
                          // action={`/themes/${data.slug}`}
                          >
                            <label>
                              <span className="screen-reader-text">
                                Search for:
                              </span>
                              <input
                                placeholder="Search for a theme or category"
                                className="col-md-12 input"
                                onChange={(e) =>
                                  onChangeHandler(e.target.value)
                                }
                                value={text}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setSuggestions([]);
                                  }, 100);
                                }}
                              />
                              <input
                                type="submit"
                                className="search-submit"
                                value="search"
                                onClick={(e) => submitRequest(e, data.slug)}
                              />
                            </label>
                            {suggestions &&
                              suggestions.map((item, index) => (
                                <div
                                  key={index}
                                  className="suggestion col-md-12 justify-content-md-center"
                                  style={{
                                    marginTop: "10px",
                                  }}
                                  onClick={() => onSuggestHandler(item.title)}
                                >
                                  {item.title}
                                  {/* <Card>
                                    <CardHeader
                                      title={`Theme Name: ${item.title}`}
                                      subheader={`Categories: ${item.category.map(
                                        (cat) => cat.name
                                      )}`}
                                    > */}
                                  {/* <Navigate to={{
                                pathname: `/themes/ + ${item.slug}`,
                                state: { searchResults: {themeMatch} }
                            }}/> */}
                                  {/* </CardHeader>
                                  </Card> */}
                                </div>
                              ))}
                          </form>
                          <span className="search-arrow"></span>
                        </div>
                      </>
                    ))}
                  <div className="wpwheels-button">
                    <Link
                      to="/login"
                      target="_self"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   FS.Members.configure({
                      //     store_id: 4578,
                      //     public_key: "pk_ea1be915a93d15122c7f79c964333",
                      //   }).open();
                      //   // <Dashboard />
                      // }}
                      onClick={
                        <Login />
                      }
                    >
                      Log In
                      <span className="ti ti-arrow-right"></span>
                    </Link>
                  </div>

                  {/* <button className="wpwheels-button">
                    {menu.title}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Navbar;
