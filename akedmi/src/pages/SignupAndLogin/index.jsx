import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/signupAndLoginContext";
import ImageSlider from "./ImageSlider";
import logo from "../../assets/logo.png";
import Signup from "./signup";
import Login from "./login";

const SignupAndLogin = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const toggleAuth = () => {
    setIsSignup((prev) => !prev);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setIsSignup(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col lg:flex-row bg-[#F3F4FF] w-full p-10 gap-10">
      <div className="w-full h-full lg:w-1/2">
        <ImageSlider />
      </div>
      <div className="w-full lg:w-1/2 min-h-screen py-4 flex items-center justify-center flex-col gap-10">
        <img
          src={logo}
          alt="Logo"
          className="w-[160px] h-[160px] rounded-full"
        />

        {isSignup ? (
          <Signup switchToLogin={() => setIsSignup(false)} />
        ) : (
          <Login />
        )}

        <p className="text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleAuth}
            className="text-[#4D44B5] font-medium underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupAndLogin;
