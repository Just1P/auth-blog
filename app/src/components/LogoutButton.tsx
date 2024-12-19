import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
