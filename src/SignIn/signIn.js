import axios from "axios";
import { useState, useEffect } from "react";

function SignIn() {
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
    axios.post(url, {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    }).then((res) => {
      console.log(res.data);
    });
  };

  const clickLogin = (e) => {
    e.preventDefault();
    fetch (url, {
       method: "POST",
       body: JSON.stringify({
        //  email: idValue,
        //  password: pwValue
      }),
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.message === "SUCCESS"){
        alert("You are logged in.");
        // goToMain();
       } else {
        alert("Please check your login information.");
       }
    });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if(!values.email) {
    errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
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
        //<pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <></>
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
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
          <button className="wpwheels-button"
          type="submit"
          onClick={clickLogin}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
