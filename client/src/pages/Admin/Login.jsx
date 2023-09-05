import { useState } from "react";
import Input from "../../Utils/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    // create an api request to login the user
    // navigate to chat section
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
