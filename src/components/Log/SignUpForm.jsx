import axios from "axios";
import React, { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [termsError, setTermsError] = useState("");

  const url = `${import.meta.env.VITE_API_URL}api/user/register`;

  const handleRegister = async e => {
    e.preventDefault();
    setTermsError("");
    setConfirmPassError("");
    if (password !== confirmPass || !terms.checked) {
      if (password !== confirmPass) {
        setConfirmPassError("Mot de passe ne correspond pas");
      }
      if (!terms.checked) {
        setTermsError("Veuillez accepter les conditions générales");
      }
    } else {
      await axios({
        method: "post",
        url,
        data: {
          username,
          email,
          password
        }
      })
        .then(() => setFormSubmit(true))
        .catch(err => {
          if (err.response.data.errors) {
            setUsernameError(err.response.data.errors.username);
            setEmailError(err.response.data.errors.email);
            setPasswordError(err.response.data.errors.password);
          }
        });
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success"> Inscription réussi, veuillez connecter</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={e => {
              setUsername(e.target.value);
            }}
            value={username}
          />

          <div className="pseudo error">{usernameError}</div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="username"
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <div className="email error">{emailError}</div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <div className="password error">{passwordError}</div>
          <br />
          <label htmlFor="confirmPass">Confirmer votre mot de passe</label>
          <br />
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            onChange={e => {
              setConfirmPass(e.target.value);
            }}
            value={confirmPass}
          />
          <div className="password-confirm error">{confirmPassError}</div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferer">
              conditions générales
            </a>
          </label>
          <div className="terms error">{termsError}</div>
          <input type="submit" value="Inscription" />
        </form>
      )}
    </>
  );
};
export default SignUpForm;
