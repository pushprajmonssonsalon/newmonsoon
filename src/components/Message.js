import { FaStar } from "react-icons/fa6";

const Message = ({ img, name, desc }) => {
  return (
    <div className="flex flex-col w-full md:justify-start justify-center items-center text-center md:items-start bg-white rounded-lg h-full ">
      <div className="text-[1rem] xl:text-[1.8rem] italic text-[#191919]/60 font-Inter font-normal  flex flex-wrap">
        <p className="w-[90%] xl:w-[80%] 2xl:w-[70%] mx-auto">"{desc}"</p>
      </div>
      <div className="flex w-fi my-6 mx-auto uppercase">
        <h1 className="text-xl text-black font-bold ">{name}</h1>
      </div>
      <h1 className="mx-auto flex items-center gap-1 text-yellow-500 text-[1.4rem] md:text-[2rem]">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </h1>
    </div>
  );
};

export default Message;
