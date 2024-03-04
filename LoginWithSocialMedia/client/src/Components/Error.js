import React from "react";
import { useNavigate } from "react-router-dom";
import error2 from "../assets/error2.gif"

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <img
          src={error2}
          alt="error"
          style={{ width: "53vw", marginTop: "2vh" }}
        />
        <br />
        <h2 style={{ color: "red" }}>Sorry! Something went wrong</h2>
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#6200ff",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          }}
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    </>
  );
};

export default Error;
