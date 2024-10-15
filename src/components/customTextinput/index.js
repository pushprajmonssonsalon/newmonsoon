import React  from "react";
import './textinput.css'
const InputField = ({ value, label, name, placeholder, type, onChange,style }) => (
  <div>
    {label && <label htmlFor="input-field">{label}</label>}
    {/* <Typography>label</Typography> */}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
      style={style}
      // label={label}
    />
  </div>
);

export default InputField;