import "./CustomInput";
function CustomInput({
  fullSpan = false,
  error = null,
  helperText = null,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder = "",
  label,
  name,
}) {
  return (
    <>
      <div
        className={`relative h-[50px] ${fullSpan ? "col-span-full" : ""} my-1`}
      >
        {/* Static Label */}
        <label
          htmlFor={name}
          className={`block text-sm font-medium my-2 ${
            error ? "text-red-500" : "text-black"
          }`}
        >
          {label} {required && <sup className="text-sm -mt-3">*</sup>}
        </label>

        {/* Input Field */}
        <input
          type={type}
          id={name}
          className={`block rounded-sm h-full bg-white outline-none px-[14px]  ${
            error ? "placeholder:text-red-600" : "placeholder:text-black"
          }  py-[8.5px] w-full text-sm text-gray-900 border ${
            error ? "border-red-600" : "border-gray-600"
          } focus:ring-0 focus:outline-2 outline-offset-[-2px] focus:outline-black focus:border-black`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {/* Error Message */}
        {error && (
          <p className="my-1 text-[11px] text-red-500">
            <span className="font-medium">{helperText}</span>
          </p>
        )}
      </div>
    </>
  );
}

export default CustomInput;
