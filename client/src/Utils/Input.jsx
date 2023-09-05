/* eslint-disable react/prop-types */

const Input = ({ value, setValue, type, placeholder }) => {
  return (
    <input
      className="bg-[#456c67] w-[13rem] rounded-md p-2 outline-none border-0 active:outline-none text-zinc-300 hover:bg-[#2e4a46] duration-150"
      type={type}
      placeholder={placeholder}
      value={value}
      required
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
