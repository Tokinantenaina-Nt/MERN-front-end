import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = props => {
  const [signInModal, setSignInModal] = useState(props.signin);
  const [signUpModal, SetSignUpModal] = useState(props.signup);
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={() => {
              setSignInModal(false);
              SetSignUpModal(true);
            }}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={() => {
              setSignInModal(true);
              SetSignUpModal(false);
            }}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signInModal && <SignInForm />}
        {signUpModal && <SignUpForm />}
      </div>
    </div>
  );
};

export default Log;
