import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#f1f1f1] justify-between items-center p-4 w-full">
      <h1 
        className="text-xl font-bold text-gray-800 ml-6 cursor-pointer"
        onClick={() => navigate("/history")}
      >
        EASYRICE TEST
      </h1>
    </div>
  );
};

export default Header;