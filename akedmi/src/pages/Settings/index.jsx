import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/signupAndLoginContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Button from "../../components/Button";

const Settings = () => {
  const { logoutAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAuth();
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-8 2xl:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
          <Navbar title="Settings" />
          <ProfileGroup gap="gap-10" />
        </div>

        <Button
          text="Logout"
          type="submit"
          onClick={handleLogout}
          hasBackground={true}
          className="!w-auto px-30 my-6"
        />
      </div>
    </div>
  );
};

export default Settings;
