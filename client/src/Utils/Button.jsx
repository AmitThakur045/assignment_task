/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Button = ({ data, link }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(link)}
      className="bg-[#456c67] w-[8rem] rounded-md p-2 text-zinc-300 hover:bg-[#2e4a46] duration-150"
    >
      {data}
    </button>
  );
};

export default Button;
