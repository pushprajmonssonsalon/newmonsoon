import { CiSearch } from "react-icons/ci";

const SearchInput = ({ name, label, placeholder, onChange, value }) => {
  return (
    <div className="relative w-full max-w-lg">
      {/* Static Label */}

      {/* Input Field */}
      <input
        type="text"
        id={name}
        className="border    border-gray-300 outline-none rounded-[25px] w-full h-[45px] py-2 px-6 pr-[1.9rem]"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <CiSearch className="absolute font-bold text-[1.9rem] text-gray-300 top-[7px] right-[35px] translate-x-1/2" />
    </div>
  );
};

export default SearchInput;
