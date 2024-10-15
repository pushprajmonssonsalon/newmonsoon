const CustomTextArea = ({
  error = null,
  helperText = null,
  required = false,
  type = "text",
  value,
  onChange,
  label,
  name,
}) => {
  return (
    <>
     <div className={`relative col-span-full my-1`}>
  {/* Static Label */}
  <label
    htmlFor={name}
    className={`block text-sm font-medium my-2 ${error ? "text-red-500" : "text-black"}`}
  >
    {label} {required && <sup className="text-sm -mt-3">*</sup>}
  </label>

  {/* Textarea */}
  <textarea
    id={name}
    rows={3}
    cols={30}
    className={`block h-full resize-none bg-white placeholder:text-black px-[14px] py-[8.5px] w-full text-sm text-gray-900 bg-transparent border  appearance-none ${error ? "border-red-500" : "border-gray-600"} focus:ring-0 focus:outline-2  focus:outline-black focus:border-black`}
    name={name}
    placeholder="Enter Comments"
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
};

export default CustomTextArea;
