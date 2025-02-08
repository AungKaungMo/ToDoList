import { useState } from "react";
import GoogleLogo from "../../assets/images/google_logo.png";
import Loading from "../../assets/icons/Loading";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";

interface AuthButtonProps {
  text: string;
}

const AuthButton = ({ text }: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert()
 
  const handleAuth = () => {
    setLoading(true);
    localStorage.setItem("auth", "true");
    setTimeout(() => {
      setLoading(false);
      navigate("/home"); 
      showAlert("Success.");
    }, 1500);
  };

  return (
    <button
      onClick={handleAuth}
      disabled={loading}
      className="mt-32 w-full p-2 rounded-xl flex items-center justify-between border bg-mute-color border-border-color cursor-pointer"
    >
      <img src={GoogleLogo} width={35} height={35} />
      <h5 className={loading ? "opacity-70" : "font-semibold"}>{text}</h5>
      <div>{loading && <Loading className="text-2xl" />}</div>
    </button>
  );
};

export default AuthButton;
