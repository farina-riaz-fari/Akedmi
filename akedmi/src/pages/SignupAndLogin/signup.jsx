import { useContext, useState } from "react";
import { AuthContext } from "../../store/signupAndLoginContext";
import { FormInput } from "../../components/Input";
import Button from "../../components/Button";

const Signup = ({ switchToLogin }) => {
  const { addAuth } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setMessage("");
      return;
    }

    setFormErrors({});
    const response = await addAuth(formData);

    if (response === "User registered successfully") {
      setMessage("Signup successful!");
      switchToLogin();
    } else {
      setMessage(response);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row overflow-x-auto">
        <div className="lg:w-full basis-[50%] px-1 sm:px-6">
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.firstName}
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
          <FormInput
            label="Email"
            name="email"
            type="email"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.email}
          />
        </div>
        <div className="lg:w-full basis-[50%] px-1 sm:px-6">
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.lastName}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            formData={formData}
            handleChange={handleChange}
            error={formErrors.confirmPassword}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          text="Sign Up"
          type="submit"
          hasBackground={true}
          className="!w-auto px-20 text-xl"
        />
      </div>

      {message && <p className="text-sm text-center text-red-500">{message}</p>}
    </form>
  );
};

export default Signup;
