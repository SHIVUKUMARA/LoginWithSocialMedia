import React from "react";
import "./login.css";
import FacebookIcon from "@mui/icons-material/Facebook";

const Login = () => {

  const loginWithGoogle = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  const loginWithFacebook = () => {
    window.open("http://localhost:8000/auth/facebook/callback", "_self");
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center"}}>Login</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" name="" id="" placeholder="username" />
            <input type="password" name="" id="" placeholder="password" />
            <button>Login</button>
            <p className="message">
              Not Registerd ? <a href="#">Create an account</a>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginWithGoogle}>
            Sign In With Google
          </button>
          <button
            className="loginBtn--facebook"
            onClick={loginWithFacebook}
          ><FacebookIcon
            className="fb-btn"
          />Sign In With Facebook 
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
