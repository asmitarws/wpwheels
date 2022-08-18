import { Axios } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const url = "https://api.wpwheels.com/wp-json/wp/v2/users";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    Axios.post(url, {
      username: formValues.username,
      password: formValues.password,
    }).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="message-success">Signed in successfully!</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form className="wpwheels-login-form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui-divider"></div>
        <div className="ui-form">
          <div className="field">
            <label>UserName</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="wpwheels-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
