import { useState } from "react";
import Input from "../../Utils/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter all fields");
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE}/api/admin/login`,
      {
        email,
        password,
      }
    );

    localStorage.setItem("admin", JSON.stringify(res.data));
    navigate("/admin");
  }

  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-col items-center justify-center gap-3 text-zinc-300">
      <h2 className="font-bold text-lg">Admin Login</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <Input
          type="email"
          placeholder="Enter the Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          placeholder="Enter the Password"
          value={password}
          setValue={setPassword}
        />

        <button
          className="bg-[#b07c4c] w-[13rem] rounded-md p-2 outline-none border-0 active:outline-none text-zinc-300 hover:bg-[#7f5833] duration-150"
          type="submit"
          disabled={email.length === 0 || password.length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
