import React, {useEffect, useState} from 'react';
import "./header.css";
import axios from "axios";
import { NavLink } from 'react-router-dom';

const Header = () => {

  const [userdata, setUserData] = useState({});
  console.log("response", userdata)

  const getUser = async()=>{
    try{
      const response = await axios.get("http://localhost:8000/login/success",{withCredentials:true});
      setUserData(response.data.user);
      
    } catch(error){
      console.log("error", error)
    }
  }

  // logout
  const logout = ()=>{
    window.open("http://localhost:8000/logout", "_self")
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <h1>
              <NavLink to="/" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
                Login With Google
              </NavLink>
            </h1>
          </div>
          <div className="right">
            <ul>
              <li className="log" style={{ paddingRight: "10px" }}>
                <NavLink to="/">Home</NavLink>
              </li>
              {Object?.keys(userdata)?.length > 0 ? (
                <>
                  <li style={{ paddingRight: "10px" }}>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li onClick={logout} style={{ paddingRight: "10px" }}>
                    Logout
                  </li>
                  <li style={{ color: "black", fontWeight: "bold" }}>
                    {userdata?.displayName}
                  </li>
                  <li>
                    <img
                      src={userdata?.image}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50px",
                      }}
                      alt="profile"
                    />
                  </li>
                </>
              ) : (
                <li className="log">
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header
