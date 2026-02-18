import { useState } from "react";

const ReadMoreMobile = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`
          transition-all duration-300
          ${expanded ? "" : "max-h-[0px] overflow-hidden md:max-h-none md:overflow-visible"}
        `}
      >
        {children}
      </div>

      {!expanded && (
        <div className="md:hidden h-10  -mt-10 pointer-events-none" />
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden relative z-2 text-[#B14648] font-medium text-[0.78rem] mt-2"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </>
  );
};
export default ReadMoreMobile