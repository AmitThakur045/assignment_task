import Button from "./Utils/Button";

function App() {
  return (
    <div className="bg-[#5d9e96] h-screen w-full flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-2">
        <Button data={"Admin Register"} link="/admin/register" />
        <Button data={"Admin Login"} link="/admin/login" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button data={"User Register"} link="/user/register" />
        <Button data={"User Login"} link="/user/login" />
      </div>
    </div>
  );
}

export default App;
