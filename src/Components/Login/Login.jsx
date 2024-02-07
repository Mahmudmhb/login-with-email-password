import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase.config";
import { useRef, useState } from "react";
// import { useState } from "react";

const Login = () => {
  const [success, setSuccess] = useState(null);
  const [loginError, setLoginError] = useState(null);
  // const [forget, setForget] = useState(null);
  const emailRef = useRef(null);
  const auth = getAuth(app);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLoginError("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setSuccess(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        const arlert = alert("please provaite valid password");
        setLoginError(arlert);
        console.log(error.message);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log("clicked", emailRef.current.value);
    if (!email) {
      console.log("please provite valid email", email);
      alert("wrong email");
      // return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("worng eamil");
      alert("provite valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        console.log(result);
        alert("Check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div>{success && <h1> you are succesfuly login done</h1>}</div>
              <div>
                {loginError && (
                  <div>
                    <h2> {loginError}</h2>
                  </div>
                )}
                {/* {forget && <div>{forget}</div>} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
