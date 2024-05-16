import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const url = `${import.meta.env.VITE_API_URL}api/user/login`;

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await axios.post(
        url,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors } = error.response.data;
        if (errors) {
          setEmailError(errors.email);
          setPasswordError(errors.password);
        }
      }
    }
  };

  return (
    <form onSubmit={handleLogin} id="signin-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        required
        id="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <div className="email error">{emailError}</div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        required
        id="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <div className="password error">{passwordError}</div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
