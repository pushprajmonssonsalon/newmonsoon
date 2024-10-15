const CustomSelect = ({ options, label,name, value, onChange,required ,error=null,helperText=null}) => {
  return (
    <>
     <div className={`relative h-[50px] ${label === "Budget" ? "col-span-full" : ""} my-1`}>
  {/* Static Label */}
  <label
    htmlFor={name}
    className={`block text-sm font-medium my-1 ${error ? "text-red-500" : "text-black"}`}
  >
    {label} {required && <sup className="text-sm -mt-3">*</sup>}
  </label>

  {/* Select Dropdown */}
  <select
    name={name}
    value={value}
    onChange={onChange}
    id={name}
    className={`block h-full px-[14px] py-[8.5px]  w-full text-sm text-gray-900 bg-white border  ${error ? "border-red-600" : "border-gray-600"}  focus:ring-0 focus:outline-2  focus:outline-black focus:border-black`}
  >
    <option value="" className={` ${
            error ? "text-red-600" : "text-black"
          }`}>Select an option</option>
    {options.map((elm, index) => (
      <option key={index} value={elm.value}>
        {elm.name}
      </option>
    ))}
  </select>


  {/* Error Message */}
  {error && (
    <p className="my-1 text-[11px] text-red-500">
      <span className="font-medium">{helperText}</span>
    </p>
  )}
</div>

    </>
  );
};

export default CustomSelect;
