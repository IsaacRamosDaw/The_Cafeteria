import "./InputFormSetting.scss";
import { forwardRef } from "react";

const InputFormSetting = forwardRef(
  function InputFormSetting({
    id,
    title,
    placeholder,
    option = 1,
    disable = false,
    type = "text",
    required = false
  }, ref) {
    return (
      <div className="container-inputform-setting">
        {option === 2 ? (
          <>
            <label className="text-inputform-setting-2" htmlFor={title}>
              {title}
            </label>
            <input
              ref={ref}
              className="input-inputform-setting-2"
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
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
              ref={ref}
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
);

export default InputFormSetting;
