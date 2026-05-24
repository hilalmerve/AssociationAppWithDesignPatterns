/*
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await axios.post("/api/auth/login", {
      username,
      password
    });

    localStorage.setItem("token", res.data.token);

    nav("/admin/news");
  };

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
} */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

  console.log("FULL RESPONSE:", res);
  console.log("DATA:", res.data);
  console.log("TOKEN FIELD:", res.data.token);

      const token = res.data?.token;

      if (!token || token.split(".").length !== 3) {
        alert("Geçersiz token geldi");
        return;
      }

      localStorage.setItem("token", token);

      nav("/admin/news");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

