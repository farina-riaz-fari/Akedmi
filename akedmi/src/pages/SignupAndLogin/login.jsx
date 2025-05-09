import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../store/signupAndLoginContext";
import { FormInput } from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginAuth, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setMessage("");
      return;
    }

    setFormErrors({});

    const isValid = await loginAuth(formData.email, formData.password);
    if (isValid) {
      navigate("/dashboard");
    } else {
      setMessage("If you are not registered, please sign up.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row overflow-x-auto">
        <div className="lg:w-full px-1 sm:px-6">
          <FormInput
            label="Email"
            name="email"
            type="email"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.password}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Button
          text="Login"
          type="submit"
          hasBackground={true}
          className="!w-auto px-20 text-xl"
        />
        {message && (
          <p className="text-sm mt-3 text-center font-normal text-red-500">
            {message}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
