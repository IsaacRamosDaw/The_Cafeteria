import "./label.scss";
import { forwardRef } from "react";

const Label = forwardRef(function Label(
  { title, placeHolder, type = "text", id, name, onChange, arialabelledby, required, min, max, patternSymbol },
  ref
) {

const pattern = patternSymbol ? `.*\\${patternSymbol}.*` : undefined;

  if (type === "file") {
    return (
      <div className="label-input">
        <label className="label-text" htmlFor={id} id={arialabelledby}>
          {title}
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder={placeHolder}
          id={id}
          name={name}
          onChange={onChange}
          ref={ref}
          aria-labelledby={arialabelledby}
          required={required}
          min={min}
          max={max}
        />
      </div>
    );
  }


  return (
    <div className="label-input">
      <label className="label-text" htmlFor={id} id={arialabelledby}>
        {title}
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        aria-labelledby={arialabelledby}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
});

export default Label;
