import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}api/user/login`;

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );
      // Si la requête est réussie, redirigez l'utilisateur ou effectuez une autre action en conséquence
      window.location = "/";
    } catch (error) {
      // Si la requête échoue, affichez les erreurs
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
