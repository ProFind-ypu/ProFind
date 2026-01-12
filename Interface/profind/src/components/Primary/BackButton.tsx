import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 p-2 rounded-full bg-transparent text-white hover:bg-white/10 transition-colors"
      aria-label="Go back"
    >
      <HiArrowLeft className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
