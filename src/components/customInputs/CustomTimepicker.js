import { useState } from "react";

const CustomTimepicker = ({ error = null }) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const amPmOptions = ["AM", "PM"];

  const handleTimeChange = () => {
    const selectedTime = `${hour}:${minute} ${amPm}`;
    console.log("Selected Time:", selectedTime);
    // You can handle the time selection as per your requirement
  };

  return (
    <div className="relative h-[45px] my-1">
    <div
      className={`block h-full outline-none px-[14px] py-[8.5px] w-full text-sm text-gray-900 bg-transparent border rounded-[4px] ${
        error ? "border-red-600" : "border-regel-gray/40"
      } appearance-none focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500 peer`}
    >
      {/* Hour Select */}
      <select
        className="border-none bg-none px-1 outline-none appearance-none"
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        onFocus={(e) => e.target.parentElement.classList.add('focus:border-blue-500')}
        onBlur={(e) => e.target.parentElement.classList.remove('focus:border-blue-500')}
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
  
      <span className="text-lg">:</span>
  
      {/* Minute Select */}
      <select
        className="border-none bg-none px-1 outline-none appearance-none"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        onFocus={(e) => e.target.parentElement.classList.add('focus:border-blue-500')}
        onBlur={(e) => e.target.parentElement.classList.remove('focus:border-blue-500')}
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
  
      {/* AM/PM Select */}
      <select
        className="border-none bg-none px-1 outline-none appearance-none"
        value={amPm}
        onChange={(e) => setAmPm(e.target.value)}
        onFocus={(e) => e.target.parentElement.classList.add('focus:border-blue-500')}
        onBlur={(e) => e.target.parentElement.classList.remove('focus:border-blue-500')}
      >
        {amPmOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <label
      className={`absolute text-sm ${
        error ? "text-red-600" : "text-regel-gray"
      } duration-300 transform z-10 origin-[0] bg-white px-2 
      peer-focus:px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 top-2 scale-75 -translate-y-4`}
    >
      TimePicker
    </label>
  </div>
  
  );
};

export default CustomTimepicker;
