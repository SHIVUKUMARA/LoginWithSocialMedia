import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bowing from "../assets/bowing.gif";

const Dashboard = () => {
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      });

      console.log("response", response);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      style={{
        marginTop: "2vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={bowing}
        alt="bow"
        style={{ width: "21vw", marginLeft: "10px" }}
      />
      <img
        src={bowing}
        alt="bow"
        style={{ width: "21vw", marginLeft: "10px" }}
      />
      <img
        src={bowing}
        alt="bow"
        style={{ width: "21vw", marginLeft: "10px" }}
      />
      <img
        src={bowing}
        alt="bow"
        style={{ width: "21vw", marginLeft: "10px" }}
      />
    </div>
  );
};

export default Dashboard;
