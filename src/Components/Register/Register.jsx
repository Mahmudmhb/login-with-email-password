import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase.config";
import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const Register = () => {
  const [success, setSuccess] = useState(null);
  const [loginError, SetLoginError] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const handleFromOnSubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const Accept = e.target.terms.checked;
    SetLoginError("");
    setSuccess("");
    // console.log(email, password);
    if (password.length < 6) {
      SetLoginError("must need 6 cherecter please provite minimum 6  or long");
      return;
    } else if (!Accept) {
      SetLoginError("please Accept our tems and condition");
      return;
    }
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(user);
      })
      .catch((error) => {
        SetLoginError(error.message);

        // console.log(error.message);
      });
  };
  // console.log(showIcon);
  return (
    <div className=" w-1/2 mt-5 mx-auto">
      <div className=" mx-auto">
        <form onSubmit={handleFromOnSubmit}>
          <input
            className="py-2 mb-3 border rounded px-3 w-full"
            type="email"
            name="email"
            placeholder="Email adress"
            required
          />
          <br />
          <div className="relative flex items-center justify-end ">
            <input
              className="py-2 border rounded px-3 w-full"
              type={showIcon ? "password" : "text"}
              name="password"
              placeholder="password"
              required
            />
            <span
              className=" absolute mr-2"
              onClick={() => setShowIcon(!showIcon)}
            >
              {showIcon ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              Accept Our <a href="">terms and condisions</a>
            </label>
          </div>
          <button className="btn btn-success w-full" type="submit">
            Register Now
          </button>
        </form>
        <div>{success && <h1> you are succesfuly login done</h1>}</div>
        <div>{loginError && <h2>{loginError}</h2>}</div>
      </div>
    </div>
  );
};

export default Register;
