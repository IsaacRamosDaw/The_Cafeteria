import "./InputFormSetting.scss";
import { forwardRef } from "react";

const InputFormSetting = forwardRef(function InputFormSetting(
  {
    id,
    title,
    placeholder,
    option = 1,
    disable = false,
    type,
    required = false,
    ariaLabeledBy,
  },
  ref
) {
  const validTypes = ["text", "number", "email", "password"];
  const inputType = validTypes.includes(type) ? type : "text";

  const handleInput = (event) => {
    if (type === "number") {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  };

  const labelClass = `text-inputform-setting-${option === 2 ? "2" : "1"}`;
  const inputClass = `input-inputform-setting-${option === 2 ? "2" : "1"}`;

  return (
    <div className="container-inputform-setting">
      <label className={labelClass} htmlFor={title} id={id}>
        {title}
      </label>
      <input
        aria-label={title}
        ref={ref}
        className={inputClass}
        id={title}
        name={title}
        type={inputType}
        inputMode={type === "number" ? "numeric" : "text"}
        onInput={handleInput}
        placeholder={placeholder}
        disabled={disable}
        required={required}
        aria-labelledby={ariaLabeledBy}
      />
    </div>
  );
});

export default InputFormSetting;