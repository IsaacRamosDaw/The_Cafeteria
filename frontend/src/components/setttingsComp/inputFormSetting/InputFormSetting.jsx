import "./InputFormSetting.scss";
import { FormControl, Input, InputLabel } from "@mui/material";

export default function InputFormSetting({
  title,
  placeholder,
  option = 1,
  disable = false,
  type = "text",
  required = false
}) {

  const id = title.split(" ")[0].toLowerCase()
  
  return (
    <div className="container-inputform-setting">
      {option === 2 ? (
        <>
          <label className="text-inputform-setting-2" htmlFor={title}>
            {title}
          </label>
          <input
            className="input-inputform-setting-2"
            id={id}
            name={id}
            type={type}
            placeholder={`${placeholder}`}
            disabled={disable}
            required={required}
          />
        </>
      ) : (
        <>
          <label className="text-inputform-setting-1" htmlFor={title}>
            {title}
          </label>
          <input
            className="input-inputform-setting-1"
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            disabled={disable}
            required={required}
          />
        </>
      )}
    </div>
  );
}
