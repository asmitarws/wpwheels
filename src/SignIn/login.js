import { useState, useEffect } from "react";
import { API_URL_Custom } from "../config/config";
import axios from "axios";

const Login = () => {
  const shortcodeData = API_URL_Custom;
  const [shortcodeValue, setShortcodeValue] = useState([]);
  useEffect(() => {
    const shortcodeUrl = shortcodeData + `/shortcode/`;
    axios
      .get(shortcodeUrl)
      .then((response) => {
        if (response?.data) {
          setShortcodeValue(response?.data);
          // console.log(setShortcodeValue, "setShortcodeValue");
        } else {
          return;
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <iframe
      id="4578"
      style={{
        width: "800px",
        height: "500px",
      }}
      // title="YouTube video player\"
      frameBorder="0"
      // allow="accelerometer"
      autoPlay
      clipboard-write
      encrypted-media
      gyroscope
      picture-in-picture
      allowFullScreen
      src="https://users.freemius.com/store/4578?public_key=pk_ea1be915a93d15122c7f79c964333"
    />
  );
};

export default Login;
