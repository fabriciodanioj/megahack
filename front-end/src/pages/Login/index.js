import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "../../services/api";
import { login, isAuthenticated } from "../../services/auth";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/");
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await api.post("/session", {
        email,
        password
      });

      const { token } = response.data;

      login(token);

      history.push("/");
    } catch (error) {
      alert("Erro de Login", "Não foi possivel fazer o login");
    }
  };

  return (
    <div className="login">
      <div className="form-login">
        <form onSubmit={handleSubmit} method="post">
          <div className="fields">
            <label htmlFor="email" className="email">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="fields">
            <label htmlFor="password" className="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}